package services

import (
	"github.com/ming-guang/neverland-camping/models"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func Start(app *pocketbase.PocketBase, context *models.AppContext) error {
	if err := startPreMigrationService(app, context); err != nil {
		return err
	}
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		if err := startPostMigrationService(app, context); err != nil {
			return err
		}
		return nil
	})
	return nil
}

func startPreMigrationService(app *pocketbase.PocketBase, context *models.AppContext) error {
	return nil
}

func startPostMigrationService(app *pocketbase.PocketBase, context *models.AppContext) error {
	return nil
}
