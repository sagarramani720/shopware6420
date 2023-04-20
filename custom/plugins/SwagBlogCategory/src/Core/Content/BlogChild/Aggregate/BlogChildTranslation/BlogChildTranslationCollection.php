<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogChild\Aggregate\BlogChildTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\Log\Package;

/**
 * @method void                add(BlogChildTranslationEntity $entity)
 * @method void                set(string $key, BlogChildTranslationEntity $entity)
 * @method BlogChildTranslationEntity[]    getIterator()
 * @method BlogChildTranslationEntity[]    getElements()
 * @method BlogChildTranslationEntity|null get(string $key)
 * @method BlogChildTranslationEntity|null first()
 * @method BlogChildTranslationEntity|null last()
 */
 #[Package('core')]
class BlogChildTranslationCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BlogChildTranslationEntity::class;
    }
}
