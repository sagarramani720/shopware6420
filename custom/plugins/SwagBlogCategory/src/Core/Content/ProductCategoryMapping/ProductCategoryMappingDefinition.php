<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\ProductCategoryMapping;

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
class ProductCategoryMappingDefinition extends MappingEntityDefinition
{
    public const ENTITY_NAME = 'product_category_mapping';

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
            (new FkField('product_group_id', 'productGroupId', BlogChildDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('product_id', 'productId', ProductDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('productGroup', 'product_group_id', BlogChildDefinition::class, 'id',false),
            new ManyToOneAssociationField('product', 'product_id', ProductDefinition::class, 'id',false),
            new CreatedAtField(),
        ]);
    }
}
