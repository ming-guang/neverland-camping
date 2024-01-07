package apis

import (
	"github.com/ming-guang/neverland-camping/ui"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func registerUiRoute(app *pocketbase.PocketBase, e *core.ServeEvent) error {
	e.Router.GET(
		"/*",
		apis.StaticDirectoryHandler(ui.DistDirFS, false),
		apis.ActivityLogger(app),
	)
	return nil
}
