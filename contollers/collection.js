exports.save = async (req, res, next) => {
    const { collection } = req.body;
    const user = req.user;
    try {
        const createdCollection = await user.createCollection(collection);
        if (collection.type === 'personal') {
            await collection.restaurants.forEach(async (restaurant) => {
                await createdCollection.createRestaurant(restaurant);
            });
        }
        return res.status(201).json({ message: 'Collection created', createdCollection });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    const { collectionId } = req.body;
    const user = req.user;
    try {
        const collections = await user.getCollections({
            where: { ['collection_id']: collectionId },
        });
        if (!collections) {
            return res.status(500).json({ message: 'Server error. Collection not found' });
        }
        const collection = collections[0];
        await collection.destroy();

        return res.status(200).json({ message: 'Collection deleted', collection });
    } catch (err) {
        next(err);
    }
};

exports.load = async (req, res, next) => {
    const user = req.user;
    try {
        const collections = await user.getCollections();
        if (!collections) {
            return res.status(404).json({ message: 'Collections, not found', collections });
        }

        const modifiedCollections = await Promise.all(
            collections.map(async (collection) => {
                const collectionData = collection.dataValues;
                if (collectionData.type === 'personal') {
                    const ArrayOfRes = await collection.getRestaurants();
                    // console.log('ArrayOfRes', ArrayOfRes);
                    const modifiedRestaurants = ArrayOfRes.map((res) => {
                        return {
                            restaurant: {
                                name: res.name,
                                ['featured_image']: res.featured_image,
                                cuisines: res.cuisines,
                                location: { ['locality_verbose']: res.locality_verbose },
                                ['user_rating']: {
                                    ['rating_color']: res.rating_color,
                                    ['aggregate_rating']: res.aggregate_rating,
                                },
                                R: { ['res_id']: res.res_id },
                            },
                        };
                    });
                    collectionData.restaurants = modifiedRestaurants;
                    return collectionData;
                }
                return collectionData;
            })
        );
        console.log('modifiedRestaurants', modifiedCollections);

        return res.json({ message: 'Collections loaded', collections: modifiedCollections });
    } catch (err) {
        next(err);
    }
};
