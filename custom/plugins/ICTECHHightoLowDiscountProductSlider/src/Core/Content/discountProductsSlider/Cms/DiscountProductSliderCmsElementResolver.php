<?php declare(strict_types=1);

namespace ICTECHHightoLowDiscountProductSlider\Core\Content\discountProductsSlider\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\System\SalesChannel\Entity\SalesChannelRepositoryInterface;
use Shopware\Core\System\SystemConfig\SystemConfigService;

#[Package('inventory')]
class DiscountProductSliderCmsElementResolver extends AbstractCmsElementResolver
{
    /**
     * @var SystemConfigService
     */

    private SystemConfigService $systemConfigService;

    /**
     * @var EntityRepositoryInterface
     */

    private EntityRepositoryInterface $productRepository;

    /**
     * @var SalesChannelRepositoryInterface
     */

    private SalesChannelRepositoryInterface $channelRepository;

    /**
     * @param SystemConfigService $systemConfigService
     * @param SalesChannelRepositoryInterface $channelRepository
     */

    public function __construct(SystemConfigService $systemConfigService, SalesChannelRepositoryInterface $channelRepository)
    {
        $this->systemConfigService = $systemConfigService;
        $this->channelRepository = $channelRepository;
    }

    /**
     * @return string
     */

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
        try {
            $config = $slot->getFieldConfig();
            $slot->setFieldConfig($config);
            $context = $resolverContext->getSalesChannelContext();
            $criteria = new Criteria();
            $criteria->setLimit(10);
            $criteria->addFilter(new EqualsFilter('active',1));
            $criteria->addSorting(new FieldSorting('price.percentage.net','DESC'));
            $products = $this->channelRepository->search($criteria,$context);
            $slot->setData($products);
        }catch (InconsistentCriteriaIdsException $e){
            /**
            * unable to build product discount slider
            */
        }
    }
}
