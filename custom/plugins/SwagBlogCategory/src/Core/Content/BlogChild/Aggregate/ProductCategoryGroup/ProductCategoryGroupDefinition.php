<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogChild\Aggregate\ProductCategoryGroup;

use Shopware\Core\Checkout\Customer\Aggregate\CustomerGroup\CustomerGroupDefinition;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;
use Shopware\Core\Framework\Log\Package;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;

#[Package('product-blog')]
class ProductCategoryGroupDefinition extends MappingEntityDefinition
{
    public const ENTITY_NAME = 'product_category_group';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function since(): ?string
    {
        return '6.3.1.0';
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('product_group_id', 'products', BlogChildDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('product_id', 'categories', ProductDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('products', 'product_group_id', BlogChildDefinition::class, 'id'),
            new ManyToOneAssociationField('categories', 'product_id', ProductDefinition::class, 'id'),
            new CreatedAtField(),
        ]);
    }
}
