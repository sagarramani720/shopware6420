<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\Extension;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;
use SwagBlogCategory\Core\Content\ProductCategoryMappingDefinition;

class ProductExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
      $collection->add(
         new ManyToManyAssociationField(
             'productChildrens',
             BlogChildDefinition::class,
             ProductCategoryMappingDefinition::class,
             'product_id',
             'product_blog_id',
             'id',
             'id',
         )
      );
    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}
