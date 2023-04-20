<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogChild;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Inherited;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyIdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ReferenceVersionField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslatedField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslationsAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBlogCategory\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogCategory\Core\Content\BlogCategoryMappingDefinition;
use SwagBlogCategory\Core\Content\BlogChild\Aggregate\BlogChildTranslation\BlogChildTranslationDefinition;
use SwagBlogCategory\Core\Content\ProductCategoryMappingDefinition;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildCollection;

class BlogChildDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'blog_child';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return BlogChildCollection::class;
    }

    public function getEntityClass(): string
    {
        return BlogChildEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id','id'))->addFlags(new Required(), new PrimaryKey()),
            (new TranslatedField('name','name'))->addFlags(new Required()),
            (new TranslatedField('description','description'))->addFlags(new Required()),
            (new DateField('release_date','release_date'))->addFlags(new Required()),
            (new BoolField('active','active'))->addFlags(new ApiAware()),
            (new StringField('author','author'))->addFlags(new Required()),

            (new ManyToManyIdField('category_ids','categoryId','blogCategories'))->addFlags(new Inherited()),
            (new ManyToManyIdField('product_ids','productId','productCategories'))->addFlags(new Inherited()),

            new ManyToManyAssociationField(
                'blogCategories',
                BlogCategoryDefinition::class,
                BlogCategoryMappingDefinition::class,
                'category_id',
                'blog_category',
                'id',
                'id'
            ),

            new ManyToManyAssociationField(
                'productCategories',
                ProductDefinition::class,
                ProductCategoryMappingDefinition::class,
                'product_blog_id',
                'product_id',
                'id',
                'id'
            ),

            (new TranslationsAssociationField(
                BlogChildTranslationDefinition::class,
                'blog_child_id'
            )),
        ]);
    }
}
