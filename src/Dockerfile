ARG  BUN_IMAGE=oven/bun:1.0.20
ARG  BUILDER_IMAGE=golang:1.22-rc-alpine3.18
ARG  DISTROLESS_IMAGE=gcr.io/distroless/static

############################
# STEP 1 build the docs page
############################
FROM ${BUN_IMAGE} as ui-builder

WORKDIR /build/ui/

COPY ./ui/ .

RUN bun install --frozen-lockfile --location=global

RUN bun run build-only

############################
# STEP 2 build executable binary
############################
FROM ${BUILDER_IMAGE} as builder

# Ensure ca-certficates are up to date
RUN update-ca-certificates

WORKDIR $GOPATH/src/mypackage/myapp/

# use modules
COPY ./go.mod .

RUN apk add git

ENV GO111MODULE=on
RUN go mod download
RUN go mod verify

COPY . .

# Copy our pre-built document
COPY --from=ui-builder /build/ui/dist ./ui/dist

# Build the static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags='-w -s -extldflags "-static"' -a \
    -o /go/bin/neverland-camping ./cmd/serve.go

############################
# STEP 3 build a small image
############################
# using static nonroot image
# user:group is nobody:nobody, uid:gid = 65534:65534
FROM ${DISTROLESS_IMAGE}

# Copy our static executable
COPY --from=builder /go/bin/neverland-camping /go/bin/neverland-camping

# Run the hello binary.
ENTRYPOINT ["/go/bin/neverland-camping", "serve"]
