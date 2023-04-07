<?php

declare(strict_types=1);

namespace SwagTestDemo\Core\Content\TestDemo;

use SwagTestDemo\Core\Content\TestDemo\Aggregate\TestDemoTranslation\TestDemoTranslationDefinition;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslatedField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslationsAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\System\Country\Aggregate\CountryState\CountryStateDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ReferenceVersionField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Inherited;
use Shopware\Core\System\Country\CountryDefinition;

class TestDemoDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'test_demo';
    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return TestDemoCollection::class;
    }

    public function getEntityClass(): string
    {
        return TestDemoEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection(
            array(
                (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
                (new ReferenceVersionField(ProductDefinition::class))->addFlags(new ApiAware(), new Inherited()),
                (new TranslatedField('name', 'name'))->addFlags(new Required()),
                (new TranslatedField('city', 'city'))->addFlags(new Required()),
                (new StringField('not_translated_field', 'notTranslatedField'))->addFlags(new ApiAware()),
                new BoolField('active', 'active'),
                (new FkField('country_id', 'countryId', CountryDefinition::class))->addFlags(new ApiAware(), new Required()),
                (new FkField('country_state_id', 'countryStateId', CountryStateDefinition::class))->addFlags(new ApiAware()),
                new FkField('media_id','mediaId',MediaDefinition::class),
                new FkField('product_id','productId',ProductDefinition::class),
                (new TranslationsAssociationField(TestDemoTranslationDefinition::class,'swag_first_test_demo_id'))->addFlags(new Required()),
                (new ManyToOneAssociationField('country','country_id',CountryDefinition::class,'id'))->addFlags(new ApiAware()),
                (new ManyToOneAssociationField('state','country_state_id',CountryStateDefinition::class,'id'))->addFlags(new ApiAware()),
                (new OneToOneAssociationField('media','media_id','id',MediaDefinition::class,false))->addFlags(new ApiAware(), new Required()),
                (new ManyToOneAssociationField('product','product_id',ProductDefinition::class,'id'))->addFlags(new ApiAware(), new Required()),
            )
        );
    }
}
