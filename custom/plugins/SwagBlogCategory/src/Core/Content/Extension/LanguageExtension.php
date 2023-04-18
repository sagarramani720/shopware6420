<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\Extension;

use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\Language\LanguageDefinition;
use SwagBlogCategory\Core\Content\BlogCategory\Aggregate\BlogCategoryTranslation\BlogCategoryTranslationDefinition;
use SwagBlogCategory\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogCategory\Core\Content\BlogChild\Aggregate\BlogChildTranslation\BlogChildTranslationDefinition;

class LanguageExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToManyAssociationField('blogCategoryTranslationsId',BlogCategoryTranslationDefinition::class,'name','id')
        );

        $collection->add(
            new OneToManyAssociationField('blogChildTranslationId',BlogChildTranslationDefinition::class,'name','id')
        );

        $collection->add(
            new OneToManyAssociationField('blogChildTranslationId',BlogChildTranslationDefinition::class,'description','id')
        );
    }
    public function getDefinitionClass(): string
    {
        return LanguageDefinition::class;
    }
}
