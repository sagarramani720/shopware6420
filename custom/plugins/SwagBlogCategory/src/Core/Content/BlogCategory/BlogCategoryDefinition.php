<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslatedField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslationsAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBlogCategory\Core\Content\BlogCategory\Aggregate\BlogCategoryTranslation\BlogCategoryTranslationDefinition;
use SwagBlogCategory\Core\Content\BlogCategoryMappingDefinition;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;

class BlogCategoryDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'blog_category';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return BlogCategoryCollection::class;
    }

    public function getEntityClass(): string
    {
        return BlogCategoryEntity::class;
    }
    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id','id'))->addFlags(new Required(), new PrimaryKey()),
            (new TranslatedField('name','name'))->addFlags(new Required()),
            (new TranslationsAssociationField(
                BlogCategoryTranslationDefinition::class,
                'blog_category_id',
            )),

            new ManyToManyAssociationField(
                'blogChildrens',
                BlogChildDefinition::class,
                BlogCategoryMappingDefinition::class,
                'blog_category',
                'category_id',
                'id',
                'id'
            ),
        ]);
    }
}
