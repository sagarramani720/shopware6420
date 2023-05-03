<?php declare(strict_types=1);

namespace ICTECHHightoLowDiscountProductSlider\Core\Content\discountProductsSlider\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\EntityResolverContext;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\SalesChannel\Struct\ProductSliderStruct;
use Shopware\Core\Content\Product\ProductCollection;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Content\ProductStream\Service\ProductStreamBuilder;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\System\SystemConfig\SystemConfigService;

#[Package('inventory')]
class DiscountProductSliderCmsElementResolver extends AbstractCmsElementResolver
{
    private const PRODUCT_SLIDER_ENTITY_FALLBACK = 'product-slider-entity-fallback';
    private const STATIC_SEARCH_KEY = 'product-slider';
    private const FALLBACK_LIMIT = 50;

    /**
     * @internal
     */

    /**
     * @var SystemConfigService
     */

    private SystemConfigService $systemConfigService;

    /**
     * @var EntityRepositoryInterface
     */

    private EntityRepositoryInterface $productRepository;

    /**
     * @var ProductStreamBuilder
     */

    private ProductStreamBuilder $productStreamBuilder;

    /**
     * @param SystemConfigService $systemConfigService
     * @param ProductStreamBuilder $productStreamBuilder
     * @param EntityRepositoryInterface $productRepository
     */

    public function __construct(SystemConfigService $systemConfigService, ProductStreamBuilder $productStreamBuilder, EntityRepositoryInterface $productRepository)
    {
        $this->productStreamBuilder = $productStreamBuilder;
        $this->systemConfigService = $systemConfigService;
        $this->productRepository = $productRepository;
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
            $context = $resolverContext->getSalesChannelContext()->getContext();
            $product = $this->productRepository->searchIds(new Criteria(), $context);
            dd($product);
        }catch (InconsistentCriteriaIdsException $e){

            /**
            * unable to build product discount slider
            */
        }
    }
}
