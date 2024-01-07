package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	"github.com/ming-guang/neverland-camping/apis"
	"github.com/ming-guang/neverland-camping/hooks"
	"github.com/ming-guang/neverland-camping/models"
	"github.com/ming-guang/neverland-camping/services"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		return
	}

	app := pocketbase.New()

	context, err := models.NewContext()
	if err != nil {
		log.Fatal(err)
		return
	}

	if err := registerMiddleware(app, context); err != nil {
		log.Fatal(err)
		return
	}

	if err := registerApis(app, context); err != nil {
		log.Fatal(err)
		return
	}

	if err := hooks.RegisterHooks(app, context); err != nil {
		log.Fatal(err)
		return
	}

	if err := startServices(app, context); err != nil {
		log.Fatal(err)
		return
	}

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: false,
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
		return
	}
}

func registerMiddleware(
	app *pocketbase.PocketBase,
	context *models.AppContext,
) error {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.Use(appendAppContext(context))
		return nil
	})
	return nil
}

func registerApis(
	app *pocketbase.PocketBase,
	context *models.AppContext,
) error {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		apis.RegisterApis(app, e)
		return nil
	})
	return nil
}

func appendAppContext(context *models.AppContext) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			return next(&models.EchoContext{
				Context:    c,
				AppContext: context,
			})
		}
	}
}

func startServices(
	app *pocketbase.PocketBase,
	context *models.AppContext,
) error {
	if err := services.Start(app, context); err != nil {
		return err
	}
	return nil
}
