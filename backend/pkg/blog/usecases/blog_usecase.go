package usecases

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type BlogUsecase interface {
	GetAll(condition string) ([]models.Blog, error)
	GetLikeFromBlogId(id uint) (models.BlogLike, error)
	GetLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error)
	CreateBlog(blog entities.Blog) error
	UpdateBlog(blog entities.Blog) error
	DeleteBlog(id uint) error
}