<?php declare(strict_types=1);

namespace SwagTestDemo\Core\Content\TestDemo;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\System\Country\CountryEntity;
use Shopware\Core\System\Country\Aggregate\CountryState\CountryStateEntity;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Content\Product\ProductEntity;

class TestDemoEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $id;

    /**
     * @var string
     */
    protected string $name;

    /**
     * @var string
     */
    protected string $city;

    /**
     * @var string|null
     */
    protected ?string $notTranslatedField;

    /**
     * @var bool|null
     */
    protected ?bool $active;

    /**
     * @var string
     */
    protected string $countryId;

    /**
     * @var string|null
     */
    protected ?string $countryStateId;

    /**
     * @var string|null
     */
    protected ?string $mediaId;

    /**
     * @var string|null
     */
    protected ?string $productId;

    /**
     * @var EntityCollection
     */
    protected EntityCollection $translations;

    /**
     * @var CountryEntity|null
     */
    protected ?CountryEntity $country;

    /**
     * @var CountryStateEntity|null
     */
    protected ?CountryStateEntity $state;

    /**
     * @var MediaEntity
     */
    protected MediaEntity $media;

    /**
     * @var ProductEntity
     */
    protected ProductEntity $product;

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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    public function getNotTranslatedField(): ?string
    {
        return $this->notTranslatedField;
    }

    public function setNotTranslatedField(?string $notTranslatedField): void
    {
        $this->notTranslatedField = $notTranslatedField;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): void
    {
        $this->active = $active;
    }

    public function getCountryId(): string
    {
        return $this->countryId;
    }

    public function setCountryId(string $countryId): void
    {
        $this->countryId = $countryId;
    }

    public function getCountryStateId(): ?string
    {
        return $this->countryStateId;
    }

    public function setCountryStateId(?string $countryStateId): void
    {
        $this->countryStateId = $countryStateId;
    }

    public function getMediaId(): ?string
    {
        return $this->mediaId;
    }

    public function setMediaId(?string $mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    public function getProductId(): ?string
    {
        return $this->productId;
    }

    public function setProductId(?string $productId): void
    {
        $this->productId = $productId;
    }

    public function getTranslations(): EntityCollection
    {
        return $this->translations;
    }

    public function setTranslations(EntityCollection $translations): void
    {
        $this->translations = $translations;
    }

    public function getCountry(): ?CountryEntity
    {
        return $this->country;
    }

    public function setCountry(?CountryEntity $country): void
    {
        $this->country = $country;
    }

    public function getState(): ?CountryStateEntity
    {
        return $this->state;
    }

    public function setState(?CountryStateEntity $state): void
    {
        $this->state = $state;
    }

    public function getMedia(): MediaEntity
    {
        return $this->media;
    }

    public function setMedia(MediaEntity $media): void
    {
        $this->media = $media;
    }

    public function getProduct(): ProductEntity
    {
        return $this->product;
    }

    public function setProduct(ProductEntity $product): void
    {
        $this->product = $product;
    }

    public function getCreatedAt(): \DateTimeInterface
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
}
