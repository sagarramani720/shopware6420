<?php declare(strict_types=1);

use Faker\Factory;
use Shopware\Core\Content\Media\Exception\MediaNotFoundException;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Content\Product\Exception\ProductNotFoundException;
use Shopware\Core\Content\Product\ProductEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\Country\Aggregate\CountryState\CountryStateEntity;
use Shopware\Core\System\Country\CountryEntity;
use Shopware\Core\System\Country\Exception\CountryNotFoundException;
use Shopware\Core\System\Country\Exception\CountryStateNotFoundException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route(defaults={"_routeScope"={"api"}})
 */

class TestDemoController extends AbstractController
{
    /**
     * @var EntityRepositoryInterface;
     */
    private $countryRepository;

    /**
     * @var EntityRepositoryInterface;
     */
    private $testDemoRepository;

    private $countryStateRepository;
    /**
     * @var EntityRepositoryInterface
     */
    private $mediaRepository;
    /**
     * @var EntityRepositoryInterface
     */
    private $productRepository;

    public function __construct(EntityRepositoryInterface $countryRepository, EntityRepositoryInterface $testDemoRepository, EntityRepositoryInterface $countryStateRepository, EntityRepositoryInterface $mediaRepository, EntityRepositoryInterface $productRepository)
    {
        $this->countryRepository = $countryRepository;
        $this->testDemoRepository = $testDemoRepository;
        $this->countryStateRepository = $countryStateRepository;
        $this->mediaRepository = $mediaRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * @Route("//api/v{version}/_action/swag_test_demo/generate", name="api.custom.swag_test_demo.generate", methods={"POST"})
     */

    public function generate(Context $context): Response
    {
        $faker = Factory::create();
        $country = $this->getActiveCountry($context);
        $data = [];
        for ($i = 0; $i < 50; $i++){
            $data[] = [
                'id' => Uuid::randomHex(),
                'active' => true,
                'name' => $faker->name,
                'city' => $faker->city,
            ];
        }
        $this->testDemoRepository->create($data, $context);

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    /**
     * @param Context $context
     * @return CountryEntity
     * @return CountryStateEntity
     * @return MediaEntity
     * @return ProductEntity
     * @throws CountryNotFoundException
     * @throws InConsistentCriteriaIdsException
     */
    private function getActiveCountry(Context $context): CountryEntity
    {
        $criteria = new criteria();
        $criteria->addFilter(new EqualsFilter('active','1'));
        $criteria->setLimit(1);

        $country = $this->countryRepository->search($criteria, $context)->getEntities()->first();
        if($country === null){
            throw new CountryNotFoundException('');
        }

        $countryState = $this->countryStateRepository->search($criteria, $context)->getEntities()->first();
        if($countryState === null){
            throw new CountryStateNotFoundException('');
        }

        $media = $this->mediaRepository->search($criteria, $context)->getEntities()->first();
        if($media === null){
            throw new MediaNotFoundException();
        }

        $product = $this->productRepository->search($criteria, $context)->getEntities()->first();
        if($product === null){
            throw new ProductNotFoundException();
        }

        return $country;
    }
}
