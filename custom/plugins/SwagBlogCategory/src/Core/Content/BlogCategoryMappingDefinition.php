<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content;

use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;
use SwagBlogCategory\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;

class BlogCategoryMappingDefinition extends MappingEntityDefinition
{
    public const ENTITY_NAME = 'blog_mapping';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('blog_category', 'blogCategoryId', BlogCategoryDefinition::class,'id'))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('category_id', 'categoryId', BlogChildDefinition::class,'id'))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('blogCategory', 'blog_category', BlogCategoryDefinition::class, 'id',false),
            new ManyToOneAssociationField('category', 'category_id', BlogChildDefinition::class, 'id',false)
        ]);
    }
}
