package apis

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterApis(app *pocketbase.PocketBase, e *core.ServeEvent) error {
	if err := registerUiRoute(app, e); err != nil {
		return err
	}
	return nil
}
