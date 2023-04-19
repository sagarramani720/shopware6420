<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogCategoryMapping;

use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;
use Shopware\Core\Framework\Log\Package;
use SwagBlogCategory\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;

#[Package('category-blog')]
class BlogCategoryMappingDefinition extends MappingEntityDefinition
{
    public const ENTITY_NAME = 'blog_category_mapping';

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
            (new FkField('category_group_id', 'categoryGroupId', BlogChildDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('category_id', 'categoryId', BlogCategoryDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('categoryGroup', 'category_group_id', BlogChildDefinition::class, 'id',false),
            new ManyToOneAssociationField('category', 'category_id', BlogCategoryDefinition::class, 'id',false),
            new CreatedAtField(),
        ]);
    }
}
