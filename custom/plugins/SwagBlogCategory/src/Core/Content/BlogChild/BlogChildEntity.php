<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogChild;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Content\Product\ProductCollection;

class BlogChildEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var \DateTimeInterface
     */
    protected $release_date;

    /**
     * @var bool|null
     */
    protected $active;

    /**
     * @var string
     */
    protected $author;

    /**
     * @var array|null
     */
    protected $categoryId;

    /**
     * @var array|null
     */
    protected $productId;

    /**
     * @var EntityCollection|null
     */
    protected $blogCategories;

    /**
     * @var ProductCollection|null
     */
    protected $productCategories;

    /**
     * @var EntityCollection|null
     */
    protected $translations;

    /**
     * @var \DateTimeInterface
     */
    protected $createdAt;

    /**
     * @var \DateTimeInterface|null
     */
    protected $updatedAt;

    /**
     * @var array|null
     */
    protected $translated;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getRelease_date(): \DateTimeInterface
    {
        return $this->release_date;
    }

    public function setRelease_date(\DateTimeInterface $release_date): void
    {
        $this->release_date = $release_date;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): void
    {
        $this->active = $active;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function getCategoryId(): ?array
    {
        return $this->categoryId;
    }

    public function setCategoryId(?array $categoryId): void
    {
        $this->categoryId = $categoryId;
    }

    public function getProductId(): ?array
    {
        return $this->productId;
    }

    public function setProductId(?array $productId): void
    {
        $this->productId = $productId;
    }

    public function getBlogCategories(): ?EntityCollection
    {
        return $this->blogCategories;
    }

    public function setBlogCategories(EntityCollection $blogCategories): void
    {
        $this->blogCategories = $blogCategories;
    }

    public function getProductCategories(): ?ProductCollection
    {
        return $this->productCategories;
    }

    public function setProductCategories(ProductCollection $productCategories): void
    {
        $this->productCategories = $productCategories;
    }

    public function getTranslations(): ?EntityCollection
    {
        return $this->translations;
    }

    public function setTranslations(EntityCollection $translations): void
    {
        $this->translations = $translations;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function getTranslated(): array
    {
        return $this->translated;
    }

    public function setTranslated(?array $translated): void
    {
        $this->translated = $translated;
    }
}
