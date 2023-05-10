<?php declare(strict_types=1);

namespace ICTECHHightoLowDiscountProductSlider\Core\Content\discountProductsSlider\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\EntityResolverContext;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\SalesChannel\Struct\CrossSellingStruct;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\System\SalesChannel\Entity\SalesChannelRepositoryInterface;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;

#[Package('inventory')]
class DiscountProductSliderCmsElementResolver extends AbstractCmsElementResolver
{

    /**
     * @var SalesChannelRepositoryInterface
     */
    private SalesChannelRepositoryInterface $productRepository;

    /**
     * @var SystemConfigService
     */
    private SystemConfigService $systemConfigService;

    /**
     * @internal
     */

    public function __construct(SystemConfigService $systemConfigService, SalesChannelRepositoryInterface $productRepository)
    {
        $this->systemConfigService = $systemConfigService;
        $this->productRepository = $productRepository;
    }

    public function getType(): string
    {
        return 'discount-product-slider';
    }

    /**
     * @param CmsSlotEntity $slot
     * @param ResolverContext $resolverContext
     * @return CriteriaCollection|null
     */

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $collection = new CriteriaCollection();
        return $collection->all() ? $collection : null;
    }

    /**
     * @param CmsSlotEntity $slot
     * @param ResolverContext $resolverContext
     * @param ElementDataCollection $result
     * @return void
     */

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
            $config = $slot->getFieldConfig();
            $context = $resolverContext->getSalesChannelContext();
            $slot->setFieldConfig($config);
//            $struct = new CrossSellingStruct();
//            $slot->setData($struct);

            $productLimit = $slot->getFieldConfig()->get('totalNumber');
            $limit = (int)$productLimit->getValue();

            $configContent = $slot->getFieldConfig()->get('content');
            if ($configContent->isMapped() && $resolverContext instanceof EntityResolverContext) {
                $categoryId = $this->resolveEntityValueToString($resolverContext->getEntity(), $configContent->getStringValue(), $resolverContext);
            }

            if ($configContent->isStatic()) {
                if ($resolverContext instanceof EntityResolverContext) {
                    $categoryId = (string) $this->resolveEntityValues($resolverContext, $configContent->getStringValue());
                } else {
                    $categoryId = $configContent->getStringValue();
                }
            }

            if ($limit === 0) {
                return;
            }
            $productsIsNew = null;

            $criteria = new Criteria();
            $criteria->addFilter(
                new EqualsAnyFilter('categoryTree', [$categoryId]),
            );
            $criteria->addAssociation('options.group');
//            $criteria->setLimit(5);
            $criteria->addFilter(new EqualsFilter('active',1));
            $criteria->addSorting(new FieldSorting('price.percentage.net','DESC'));
            $products = $this->productRepository->search($criteria, $context)->getElements();
            if ($products === null) {
                return;
            }
            $slot->setData(new ArrayStruct(['products'=>array_slice($products,0,$limit),'configElements'=>$config]));

//            //check is new product
//            foreach ($products as $product){
//                if($this->isNew($product, $context)){
//                    $productsIsNew[] = $product;
//                }
//            }
//            if ($productsIsNew === null) {
//                return;
//            }

    }
//    public function isNew(Entity $product, SalesChannelContext $context): bool
//    {
//        $markAsNewDayRange = $this->systemConfigService->get(
//            'core.listing.markAsNew',
//            $context->getSalesChannel()->getId()
//        );
//        $now = new \DateTime();
//        /** @var \DateTimeInterface|null $releaseDate */
//        $releaseDate = $product->get('releaseDate');
//
//        return $releaseDate instanceof \DateTimeInterface
//            && $releaseDate->diff($now)->days <= $markAsNewDayRange;
//    }
}
