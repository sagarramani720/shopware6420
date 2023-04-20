<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\Log\Package;

/**
 * @method void                add(BlogCategoryEntity $entity)
 * @method void                set(string $key, BlogCategoryEntity $entity)
 * @method BlogCategoryEntity[]    getIterator()
 * @method BlogCategoryEntity[]    getElements()
 * @method BlogCategoryEntity|null get(string $key)
 * @method BlogCategoryEntity|null first()
 * @method BlogCategoryEntity|null last()
 */
 #[Package('core')]
class BlogCategoryCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BlogCategoryEntity::class;
    }
}
