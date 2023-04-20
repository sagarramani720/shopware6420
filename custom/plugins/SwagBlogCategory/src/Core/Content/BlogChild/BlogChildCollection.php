<?php declare(strict_types=1);

namespace SwagBlogCategory\Core\Content\BlogChild;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\Log\Package;

/**
 * @method void                add(BlogChildEntity $entity)
 * @method void                set(string $key, BlogChildEntity $entity)
 * @method BlogChildEntity[]    getIterator()
 * @method BlogChildEntity[]    getElements()
 * @method BlogChildEntity|null get(string $key)
 * @method BlogChildEntity|null first()
 * @method BlogChildEntity|null last()
 */
 #[Package('core')]
class BlogChildCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BlogChildEntity::class;
    }
}
