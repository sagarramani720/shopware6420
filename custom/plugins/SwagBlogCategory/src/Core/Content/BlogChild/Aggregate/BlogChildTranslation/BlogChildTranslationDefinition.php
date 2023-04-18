<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogChild\Aggregate\BlogChildTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityTranslationDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBlogCategory\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogCategory\Core\Content\BlogChild\BlogChildDefinition;

class BlogChildTranslationDefinition extends EntityTranslationDefinition
{
    public const ENTITY_NAME = 'blog_child_translation';
    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }
    public function getParentDefinitionClass(): string
    {
        return BlogChildDefinition::class;
    }
//    public function getEntityClass(): string
//    {
//        return BlogChildTranslationEntity::class;
//    }
    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new StringField('name', 'name'))->addFlags(new Required()),
            (new StringField('description','description'))->addFlags(new Required())
        ]);
    }
}
