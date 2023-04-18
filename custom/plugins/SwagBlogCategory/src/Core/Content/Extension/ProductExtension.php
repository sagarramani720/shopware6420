<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\Extension;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBlogCategory\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogCategory\Core\Content\BlogChild\Aggregate\ProductCategoryGroup\ProductCategoryGroupDefinition;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;

class ProductExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
       $collection->add(
           new ManyToManyAssociationField(
               'blocks',
               BlogChildDefinition::class,
               ProductCategoryGroupDefinition::class,
               'product_id',
               'product_group_id'
           )
       );
    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}
