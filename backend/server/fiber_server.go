package server

import (
	"fmt"

	"github.com/Yoboba/GNA/configs"
	tagHandlers "github.com/Yoboba/GNA/pkg/tag/handlers"
	tagRepositories "github.com/Yoboba/GNA/pkg/tag/repositories"
	tagUseCases "github.com/Yoboba/GNA/pkg/tag/usecases"
	userHandlers "github.com/Yoboba/GNA/pkg/user/handlers"
	userRepositories "github.com/Yoboba/GNA/pkg/user/repositories"
	userUseCases "github.com/Yoboba/GNA/pkg/user/usecases"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

type fiberServer struct {
	App *fiber.App
	Db  *gorm.DB
	Cfg *configs.Config
}

func NewFiberServer(db *gorm.DB, cfg *configs.Config) Server {
	return &fiberServer{
		App: fiber.New(),
		Db:  db,
		Cfg: cfg,
	}
}

func (f *fiberServer) Start() {
	f.App.Use(cors.New(cors.ConfigDefault))
	f.InitUserHttpHandlers()
	f.InitTagHttpHandlers()
	// f.App.Use(middlewares.JwtAuthentication()) // <- JWT Token Middleware, Moderator Authorization ready but not being used
	serverURL := fmt.Sprintf(":%d", f.Cfg.App.Port)
	f.App.Listen(serverURL)
}

// InitTagHttpHandlers implements Server.
func (f *fiberServer) InitTagHttpHandlers() {
	tagRepository := tagRepositories.NewTagPostgresRepository(f.Db)

	tagUseCase := tagUseCases.NewTagUseCaseImpl(tagRepository)

	tagHttpHandler := tagHandlers.NewTagHttpHandler(tagUseCase)

	v1 := f.App.Group("/v1/tag")
	v1.Post("", tagHttpHandler.CreateTag)
	v1.Get("", tagHttpHandler.GetTag)
}

// InitUserHttpHandlers implements Server.
func (f *fiberServer) InitUserHttpHandlers() {
	userRepository := userRepositories.NewUserPostgresRepository(f.Db)

	userUseCase := userUseCases.NewUserUseCaseImpl(userRepository)

	userHttpHandler := userHandlers.NewUserHttpHandler(userUseCase)

	v1 := f.App.Group("/v1/user")
	v1.Post("/sign-up", userHttpHandler.SignUp)
	v1.Post("/sign-in", userHttpHandler.SignIn)
}
