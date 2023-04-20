<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogCategory\Aggregate\BlogCategoryTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\Log\Package;

/**
 * @method void                add(BlogCategoryTranslationEntity $entity)
 * @method void                set(string $key, BlogCategoryTranslationEntity $entity)
 * @method BlogCategoryTranslationEntity[]    getIterator()
 * @method BlogCategoryTranslationEntity[]    getElements()
 * @method BlogCategoryTranslationEntity|null get(string $key)
 * @method BlogCategoryTranslationEntity|null first()
 * @method BlogCategoryTranslationEntity|null last()
 */
 #[Package('core')]
class BlogCategoryTranslationCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BlogCategoryTranslationEntity::class;
    }
}
