<?php declare(strict_types=1);

namespace SwagTestDemo\Core\Content\Extension;

use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\Language\LanguageDefinition;
use SwagTestDemo\Core\Content\TestDemo\Aggregate\TestDemoTranslation\TestDemoTranslationDefinition;
use SwagTestDemo\Core\Content\TestDemo\TestDemoDefinition;

class LanguageExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToManyAssociationField('testDemoTranslationsId',TestDemoTranslationDefinition::class,'name','id')
        );

        $collection->add(
            new OneToManyAssociationField('testDemoTranslationsId',TestDemoTranslationDefinition::class,'city','id')
        );
    }
    public function getDefinitionClass(): string
    {
        return LanguageDefinition::class;
    }
}
