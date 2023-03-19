const axios = require('axios');

/**
 * gets code from facebook for authentication.
 * @returns {code} code from the facebook for authentication after entering credentials into the login.
 */

exports.getCode = async (req, res) => {
    try {
        let data = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://www.facebook.com/v16.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/facebook&scope=email,pages_read_engagement,public_profile`,
            headers: {
                'Cookie': 'fr=084dCdEonaAIIQPMi..BkAu5X.K_.AAA.0.0.BkAvZe.AWXZ2mABK6Q; sb=V-4CZNVsGqWTuf4uYBVJy50n'
            }
        };

        axios(data)
            .then(function (response) {
                if (response.data) {
                    res.status(200).json({
                        code: response.data.code
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }
};

/**
 * gets access token from facebook server.
 * @param {code} String - code from getCode function to get access Token.
 * @returns {access token} = accessToken containing basic auth config to get any required informtaion from facebook server.
 */

exports.getAccessToken = async (req, res) => {
    try {
        const { code } = req.params;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/v16.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}&authroization_code=code`,
            headers: {
                'Cookie': 'fr=084dCdEonaAIIQPMi..BkAu5X.K_.AAA.0.0.BkAvZe.AWXZ2mABK6Q; sb=V-4CZNVsGqWTuf4uYBVJy50n'
            }
        };

        axios(config)
            .then(function (response) {
                res.status(200).json({
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }
};

/**
 * gets access token from facebook server.
 * @param {access_token} String - access_token from getCode function
 * @returns {Array} array containing all of the users pages from facebook profile.
 */
exports.getFacebookPages = async (req, res) => {
    const { access_token } = req.params;
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/v16.0/me/accounts?access_token=${access_token}`,

        };

        axios(config)
            .then(function (response) {
                res.json(response.data)
                // if (response?.data && response.data?.length) {
                // retrieves information of page and sends back the page id
                // let pagesInformation = response.data;
                // console.log(response.data)
                // res.send(response.data)
                // pagesInformation.map((item) => {
                //     // FOr demonstration purpose..
                //     if (item.name === 'Testing') {
                //         let d = [data: {
                //             id: item.id,
                //             name: item.name
                //         }]
                //         res.status(200).json(d);
                //     } else {
                //         res.status(200).json([]);
                //     }
                // })
                // }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }

};

/**
 * gets access token from facebook server.
 * @param {access_token} String - access_token from getCode function
 * @param {pageId} String - page id from the array of getFacebookPages
 * @returns {Array} array containing all of the users page posts from facebook profile.
 */
exports.getFacebookPagePosts = async (req, res) => {
    let access_token = req.params.access_token;
    let pageId = req.params.pageId;
    try {
        let data = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/${pageId}/posts?access_token=${access_token}`
        };

        axios(data)
            .then(function (response) {
                console.log(response.data);
                res.json(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });



    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }

};

/**
 * gets access token from facebook server.
 * @param {access_token} String - access_token from getCode function
 * @param {message} String - post caption in string format
 * @returns {id} Objcet with post Id containing all of the users page posts from facebook profile.
 */
exports.createFacebookPost = async (req, res) => {
    let access_token = req.params.access_token;
    let message = req.params.message;
    try {
        let formData = new FormData()
        formData.append('message', `${message}`);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/me/feed/?access_token=${access_token}`,
            headers: {
                'Cookie': 'fr=084dCdEonaAIIQPMi..BkAu5X.K_.AAA.0.0.BkAvZe.AWXZ2mABK6Q; sb=V-4CZNVsGqWTuf4uYBVJy50n',
                ...formData.getHeaders()
            },
            data: formData
        };

        axios(config)
            .then(function (response) {
                if (response?.data) {
                    res.status(200).json({
                        postId: response.data.id
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }

};

/**
 * gets access token from facebook server.
 * @param {access_token} String - code from getCode function to get access Token.
 * @param {pageId} String - page id from getFacebookPage function response.
 * @param {message} String - any comment message in string format.
 * @returns {id} -commentID.
 */
exports.createCommnetOnFacebookPage = async (req, res) => {
    let access_token = req.params.access_token;
    let postId = req.params.postId;
    let message = req.params.message;
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://graph.facebook.com/v16.0/${postId}/comments?message=${message}&access_token=${access_token}`,
            headers: {
                'Cookie': 'fr=084dCdEonaAIIQPMi..BkAu5X.K_.AAA.0.0.BkAvZe.AWXZ2mABK6Q; sb=V-4CZNVsGqWTuf4uYBVJy50n'
            }
        };

        axios(config)
            .then(function (response) {
                if (response?.data) {
                    res.status(200).json(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    catch (e) {
        res.send({
            error: error.error500,
            message: e.message
        })
    }

};