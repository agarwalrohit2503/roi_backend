const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const { success, error } = require("../../../../utils/responseApi");
const editParameterQuery = require("../../../../utils/edit_query");
const sendNotification = require('../../../../utils/sendNotification');
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");

async function getAllCampaign(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;
  var brand_id = req.params.brand_id;

  const findQuery = await tableNames.Campaign.findAll({
    where: {
      brand_id: brand_id,
      campaign_delete: 0,
      ...(search_term
        ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
        : {}),
    },
    include: [
      {
        //attributes: ["content_niche_id", "content_niche_name"],
        model: tableNames.campaignPaymentType,
      },
      {
        model: tableNames.campaignStatus,
      },
      {
        model: tableNames.campaignNumberOfInfluencers,
      },
      {
        model: tableNames.campaignTargetAdienceAgeGroup,
      },
      {
        model: tableNames.campaignTargetAudienceGender,
      },
      {
        attributes: [
          "campaign_deliverables_id",
          "influencer_type_id",
          "campaign_id",

          "post",
          "story",
          "reels",
          "youtube",
        ],
        model: tableNames.campaignDeliverables,
      },
      {
        attributes: ["campaign_platform_id"],
        model: tableNames.campaignPlatform,
        include: [
          {
            attributes: ["platform_id", "platform_name", "platform_img"],
            model: tableNames.Platform,
          },
        ],
      },
      {
        attributes: ["campaign_language_id"],
        model: tableNames.campaignLanguage,
        include: [
          {
            model: tableNames.language,
          },
        ],
      },
      {
        model: tableNames.campaignImages,
      },
    ],
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  res.status(200).send({
    status: 200,
    message: "Brand",
    data: findQuery,
  });
}

async function deleteCampaign(req, res) {
  const brand_id = req.params.brand_id;
  const campaign_id = req.body.campaign_id;

  console.log(brand_id);
  console.log(campaign_id);
  try {
    const updateQuery = await tableNames.Campaign.update(
      { campaign_delete: 1 },
      { where: { brand_id: brand_id, campaign_id: campaign_id } }
    );
    if (updateQuery[0] != "") {
      res.status(200).send({
        status: 200,
        message: "deleted",
      });
    } else {
      res.status(409).send({
        status: 409,
        message: "not deleted",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
}

async function editCampaign(req, res) {
  var brand_id = req.params.brand_id;
  var campaign_id = req.body.campaign_id;

  var content_niche_id = req.body.content_niche_id;
  var platform_id = req.body.platform_id;
  var campaign_goal_id = req.body.campaign_goal_id;
  var campaign_status_id = req.body.campaign_status_id;
  var payment_status_id = req.body.payment_status_id;
  var campaign_name = req.body.campaign_name;
  var location = req.body.location;
  var campaign_about = req.body.campaign_about;
  var about_product = req.body.about_product;
  var language = req.body.language;
  var campaign_start_dt = req.body.campaign_start_dt;
  var campaign_end_dt = req.body.campaign_end_dt;
  var campaign_budget = req.body.campaign_budget;
  var image_link = req.body.image_link;

  var language_id = req.body.language_id;

  var eligibility = req.body.eligibility;

  var post = req.body.post;
  var story = req.body.story;
  var real = req.body.real;
  var youtube = req.body.youtube;

  var barter_note = req.body.barter_note;
  var content_submission_deadline = req.body.content_submission_deadline;
  var content_upload_date = req.body.content_upload_date;
  var additional_notes = req.body.additional_notes;

  if (image_link != "") {
    image_link = await imageUpload(image_link, campaign_id);
  }

  //try {
  let campaingEditParameters = {
    campaign_status_id: campaign_status_id,
    payment_status_id: payment_status_id,
    campaign_goal_id: campaign_goal_id,
    campaign_name: campaign_name,
    location: location,
    campaign_about: campaign_about,
    about_product: about_product,
    language: language,
    campaign_start_dt: campaign_start_dt,
    campaign_end_dt: campaign_end_dt,
    campaign_budget: campaign_budget,
    barter_note: barter_note,
    content_submission_deadline: content_submission_deadline,
    content_upload_date: content_upload_date,
    additional_notes: additional_notes,

    // platform: platform,
    eligibility: eligibility,
  };
  var campaignEditedValue = await editParameterQuery(campaingEditParameters);

  const updateQuery = await tableNames.Campaign.update(campaignEditedValue, {
    debug: true,
    where: {
      campaign_id: campaign_id,
      brand_id: brand_id,
      campaign_delete: 0,
    },
  });

  console.log(updateQuery);

  if (updateQuery[0] != "") {
    let campaignContentNicheRespData = await Promise.all(
      content_niche_id.map(async (item) => {
        try {
          let content_niche_info = {
            campaign_id: campaign_id,
            content_niche_id: item,
          };
          insertContentNicheQuery =
            await tableNames.campaignContentNiche.create(content_niche_info);

          return insertContentNicheQuery;
        } catch (error) {
          return { ...item, error };
        }
      })
    );

    //console.log(campaignContentNicheRespData);
    if (
      campaignContentNicheRespData == "" ||
      campaignContentNicheRespData == null
    ) {
      res.status(209).send({
        status: 209,
        message: "Campaing Content Niche not inserted",
      });
    }

    let campaignPlatformRespData = await Promise.all(
      platform_id.map(async (item) => {
        try {
          let campaign_campaignPlatform_info = {
            campaign_id: campaign_id,
            platform_id: item,
          };
          insertcampaignPlatformQuery =
            await tableNames.campaignPlatform.create(
              campaign_campaignPlatform_info
            );

          return insertcampaignPlatformQuery;
        } catch (error) {
          return { ...item, error };
        }
      })
    );
    if ((campaignPlatformRespData == "") | (campaignPlatformRespData == null)) {
      res.status(209).send({
        status: 209,
        message: "Platform Not Inserted",
      });
    }

    let campaignLanguageRespData = await Promise.all(
      language_id.map(async (item) => {
        try {
          let campaign_language_info = {
            campaign_id: campaign_id,
            language_id: language_id,
          };

          insertCampaignLanguageInfoQuery =
            await tableNames.campaignLanguage.create(campaign_language_info);
          console.log(insertCampaignLanguageInfoQuery);

          return insertCampaignLanguageInfoQuery;
        } catch (error) {
          return { ...item, error };
        }
      })
    );

    if ((campaignLanguageRespData == "") | (campaignLanguageRespData == null)) {
      res.status(209).send({
        status: 209,
        message: "language Not Inserted",
      });
    }

    let DeliverablesEdit = {
      post: post,
      story: story,
      reels: real,
      youtube: youtube,
    };
    var DeliverablesEditedData = await editParameterQuery(DeliverablesEdit);

    const updateQuery = await tableNames.campaignDeliverables.update(
      DeliverablesEditedData,
      {
        where: {
          campaign_id: campaign_id,
        },
      }
    );

    //console.log(updateQuery);
    res.status(200).send({
      status: 200,
      message: "Campaign edited",
    });
  } else {
    res.status(409).send({
      status: 409,
      message: "Campaign not edited",
    });
  }
  // } catch (err) {
  //   res.status(500).send({
  //     status: 500,
  //     message: err,
  //   });
  // }
}

async function addCampaign(req, res) {
  var brand_id = req.params.brand_id;
  var campaign_goal_id = req.body.campaign_goal_id;
  var content_niche_id = req.body.content_niche_id;
  var platform_id = req.body.platform_id;
  var campaign_status_id = req.body.campaign_status_id;
  var payment_status_id = req.body.payment_status_id;

  var campaign_name = req.body.campaign_name;
  var location = req.body.location;
  var campaign_about = req.body.campaign_about;

  var campaign_start_dt = req.body.campaign_start_dt;
  var campaign_end_dt = req.body.campaign_end_dt;
  var campaign_budget = req.body.campaign_budget;
  var image_link = req.body.image_link;
  var about_product = req.body.about_product;

  var eligibility = req.body.eligibility;
  var language_id = req.body.language_id;

  // var post = req.body.post;
  // var story = req.body.story;
  // var reels = req.body.reels;
  // var youtube = req.body.youtube;

  var barter_note = req.body.barter_note;
  var content_submission_deadline = req.body.content_submission_deadline;
  var content_upload_date = req.body.content_upload_date;
  var additional_notes = req.body.additional_notes;

  //
  var nano = req.body.nano;
  var micro = req.body.micro;
  var macro = req.body.macro;
  var mega = req.body.mega;
  var celeb = req.body.celeb;

  // var influencer_type_id = req.body.influencer_type_id;

  var target_audience_gender_id = req.body.target_audience_gender_id;

  var target_adience_age_group_id = req.body.target_adience_age_group_id;

  var campaign_deliverables_info = req.body.campaign_deliverables_info;

  //try {
    // const createQuery = await tableNames.Campaign.create({
    //   campaign_goal_id: campaign_goal_id,
    //   brand_id: brand_id,
    //   campaign_status_id: campaign_status_id,
    //   payment_status_id: payment_status_id,
    //   barter_note: barter_note,
    //   campaign_name: campaign_name,
    //   location: location,
    //   campaign_about: campaign_about,
    //   about_product: about_product,
    //   campaign_start_dt: campaign_start_dt,
    //   campaign_end_dt: campaign_end_dt,
    //   content_submission_deadline: content_submission_deadline,
    //   content_upload_date: content_upload_date,
    //   campaign_budget: campaign_budget,
    //   eligibility: eligibility,
    //   additional_notes: additional_notes,
    // });

    // if (createQuery != "") {
    //   var finalImgeUrl = await imageUpload(image_link, createQuery.campaign_id);

    //   if (finalImgeUrl == "" || finalImgeUrl == null) {
    //     res.status(209).send({
    //       status: 209,
    //       message: "Campaign Images Not Uploaded",
    //     });
    //   } else {
    //     var campaignContentNicheRespData = await Promise.all(
    //       content_niche_id.map(async (item) => {
    //         try {
    //           let content_niche_info = {
    //             campaign_id: createQuery.campaign_id,
    //             content_niche_id: item,
    //           };
    //           insertContentNicheQuery =
    //             await tableNames.campaignContentNiche.create(
    //               content_niche_info
    //             );

    //           return insertContentNicheQuery;
    //         } catch (error) {
    //           return { ...item, error };
    //         }
    //       })
    //     );
    //     if (campaignContentNicheRespData == "") {
    //       res.status(209).send({
    //         status: 209,
    //         message: "Campaing Content Niche not inserted",
    //       });
    //     }
    //     let campaignPlatformRespData = await Promise.all(
    //       platform_id.map(async (item) => {
    //         try {
    //           let campaign_campaignPlatform_info = {
    //             campaign_id: createQuery.campaign_id,
    //             platform_id: item,
    //           };
    //           insertcampaignPlatformQuery =
    //             await tableNames.campaignPlatform.create(
    //               campaign_campaignPlatform_info
    //             );

    //           return insertcampaignPlatformQuery;
    //         } catch (error) {
    //           return { ...item, error };
    //         }
    //       })
    //     );
    //     if (campaignPlatformRespData == "") {
    //       res.status(209).send({
    //         status: 209,
    //         message: "Platform Not Inserted",
    //       });
    //     }

    //     let campaignLanguageRespData = await Promise.all(
    //       language_id.map(async (item) => {
    //         try {
    //           let campaign_language_info = {
    //             campaign_id: createQuery.campaign_id,
    //             language_id: item,
    //           };

    //           insertCampaignLanguageInfoQuery =
    //             await tableNames.campaignLanguage.create(
    //               campaign_language_info
    //             );

    //           return insertCampaignLanguageInfoQuery;
    //         } catch (error) {
    //           return { ...item, error };
    //         }
    //       })
    //     );

    //     if (
    //       (campaignLanguageRespData == "") |
    //       (campaignLanguageRespData == null)
    //     ) {
    //       res.status(209).send({
    //         status: 209,
    //         message: "language Not Inserted",
    //       });
    //     }

    //     let campaignDeliverablesRespData = await Promise.all(
    //       campaign_deliverables_info.map(async (item) => {
    //         try {
    //           insertcampaignDeliverablesQuery =
    //             await tableNames.campaignDeliverables.create({
    //               ...item,
    //               campaign_id: createQuery.campaign_id,
    //             });

    //           if (
    //             insertcampaignDeliverablesQuery == "" ||
    //             insertcampaignDeliverablesQuery == null
    //           ) {
    //             res.status(209).send({
    //               status: 209,
    //               message: "Campaign  Deliverables Not Inserted",
    //             });
    //           }

    //           return insertcampaignDeliverablesQuery;
    //         } catch (error) {
    //           return { ...item, error };
    //         }
    //       })
    //     );

    //     let campaign_number_of_influencers_info = {
    //       campaign_id: createQuery.campaign_id,
    //       nano: nano ?? "",
    //       micro: micro ?? "",
    //       macro: macro ?? "",
    //       mega: mega ?? "",
    //       celeb: celeb ?? "",
    //     };
    //     const insertcampaignNumberOfInfluencers =
    //       await tableNames.campaignNumberOfInfluencers.create(
    //         campaign_number_of_influencers_info
    //       );
    //     if (
    //       insertcampaignNumberOfInfluencers == "" ||
    //       insertcampaignNumberOfInfluencers == null
    //     ) {
    //       res.status(209).send({
    //         status: 209,
    //         message: "Campaign Number of influencers info Not Inserted",
    //       });
    //     }

    //     let campaignTargetAudienceGenderInsertQuery = await Promise.all(
    //       target_audience_gender_id.map(async (item) => {
    //         try {
    //           let target_audience_gender_Info = {
    //             campaign_id: createQuery.campaign_id,
    //             target_audience_gender_id: item,
    //           };

    //           var campaignTargetAudienceGender =
    //             await tableNames.campaignTargetAudienceGender.create(
    //               target_audience_gender_Info
    //             );

    //           return campaignTargetAudienceGender;
    //         } catch (error) {
    //           return { ...item, error };
    //         }
    //       })
    //     );

    //     if (
    //       campaignTargetAudienceGenderInsertQuery == "" ||
    //       campaignTargetAudienceGenderInsertQuery == null
    //     ) {
    //       res.status(209).send({
    //         status: 209,
    //         message: "Campaign Target Audience Gender Not Inserted",
    //       });
    //     }

    //     let campaignTargetAdienceAgeGroupInsertQuery = await Promise.all(
    //       target_adience_age_group_id.map(async (item) => {
    //         try {
    //           let campaignTargetAdienceAgeGroupInfo = {
    //             campaign_id: createQuery.campaign_id,
    //             target_adience_age_group_id: item,
    //           };

    //           var campaignTargetAgeGroupInfo =
    //             await tableNames.campaignTargetAdienceAgeGroup.create(
    //               campaignTargetAdienceAgeGroupInfo
    //             );

    //           return campaignTargetAgeGroupInfo;
    //         } catch (error) {
    //           return { ...item, error };
    //         }
    //       })
    //     );

    //     if (
    //       campaignTargetAdienceAgeGroupInsertQuery == "" ||
    //       campaignTargetAdienceAgeGroupInsertQuery == null
    //     ) {
    //       res.status(209).send({
    //         status: 209,
    //         message: "Campaign Target Audience Age Group Not Inserted",
    //       });
    //     }
        //Notification Function
        const result = await sendNotification("1", "new campaing created", "new cam");

        res.status(200).send({
          status: 200,
          message: "Campaign Created",
        });
      
  //   } else {
  //     res.status(409).send({
  //       status: 409,
  //       message: "Campaign Not Created ",
  //     });
  //   }
  // } catch (err) {
  //   res.status(500).send({
  //     status: 500,
  //     message: "INERNAL SERVER ERROR",
  //     data: err,
  //   });
  // }
}

async function getCampaignDetails(req, res) {
  const campaign_id = req.params.campaign_id;

  try {
    const findQuery = await tableNames.Campaign.findOne({
      include: [
        {
          attributes: [
            "brands_id",
            "brand_logo",
            "name",
            "overview",
            "facebook_url",
            "instagram_url",
            "youtube_url",
          ],
          model: tableNames.brands,
          as: "brand",
        },
        {
          attributes: ["campaign_payment_type_id", "name"],
          model: tableNames.campaignPaymentType,
        },
        {
          model: tableNames.campaignNumberOfInfluencers,
        },
        {
          model: tableNames.campaignTargetAdienceAgeGroup,
        },
        {
          model: tableNames.campaignTargetAudienceGender,
        },
        {
          attributes: [
            "campaign_deliverables_id",
            "influencer_type_id",
            "campaign_id",
            "post",
            "story",
            "reels",
            "youtube",
          ],
          model: tableNames.campaignDeliverables,
        },
        {
          attributes: ["campaign_platform_id"],
          model: tableNames.campaignPlatform,
          include: [
            {
              attributes: ["platform_id", "platform_name", "platform_img"],
              model: tableNames.Platform,
            },
          ],
        },

        {
          model: tableNames.campaignContentNiche,

          include: [
            {
              attributes: ["content_niche_id", "content_niche_name"],
              model: tableNames.contentNiche,
              // as: "cc",
            },
          ],
        },
        {
          attributes: ["influencer_id"],
          model: tableNames.campaignApplication,
          required: false,
          where: {
            application_status_id: 2,
          },
        },
        {
          attributes: ["campaign_language_id"],
          model: tableNames.campaignLanguage,
          include: [
            {
              model: tableNames.language,
            },
          ],
        },
        {
          model: tableNames.campaignImages,
        },
      ],

      where: {
        campaign_id: campaign_id,
      },
    });

    res.status(200).send({
      status: 200,
      message:
        findQuery != null ? "Campaign Data found" : "Campaign Data Not Found",
      data: findQuery,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "INERNAL SERVER ERROR",
      data: err,
    });
  }
}

async function contentNicheDelete(req, res) {
  var campaign_id = req.params.campaign_id;
  var content_niche_id = req.body.content_niche_id;

  const content_niche_delete = content_niche_id.map(async (item) => {
    return (deleteQuery = await tableNames.campaignContentNiche.destroy({
      where: {
        campaign_id: campaign_id,
        content_niche_id: item,
      },
    }));
  });

  const respData = await Promise.all(content_niche_delete);
  if (respData != 0) {
    res.status(200).send({
      status: 200,
      message: "Deleted successfully",
    });
  } else {
    res.status(209).send({
      status: 209,
      message: "Not removed",
    });
  }
}

async function platformDelete(req, res) {
  var campaign_id = req.params.campaign_id;
  var platform_id = req.body.platform_id;

  const platfrom_delete = platform_id.map(async (item) => {
    var platfrom_findquery = await tableNames.campaignPlatform.findAll({
      where: {
        campaign_id: campaign_id,
        platform_id: item,
      },
    });

    if (platfrom_findquery == "") {
      return res.status(200).send({
        status: 200,
        message: "Already deleted",
      });
    } else {
      return (deleteQuery = await tableNames.campaignPlatform.destroy({
        where: {
          campaign_id: campaign_id,
          platform_id: item,
        },
      }));
    }
  });

  const respData = await Promise.all(platfrom_delete);
  if (respData != 0) {
    res.status(200).send({
      status: 200,
      message: "Deleted successfully",
    });
  } else {
    res.status(209).send({
      status: 209,
      message: "Not removed",
    });
  }
}

async function campaignLanguageDelete(req, res) {
  var campaign_id = req.params.campaign_id;
  var language_id = req.body.language_id;

  const campaignLanguageDeleteQuery = language_id.map(async (item) => {
    var campaign_language_find_query =
      await tableNames.campaignLanguage.findAll({
        where: {
          campaign_id: campaign_id,
          language_id: item,
        },
      });

    if (campaign_language_find_query == "") {
      return res.status(200).send({
        status: 200,
        message: "Already deleted",
      });
    } else {
      return (deleteQuery = await tableNames.campaignLanguage.destroy({
        where: {
          campaign_id: campaign_id,
          language_id: item,
        },
      }));
    }
  });

  const respData = await Promise.all(campaignLanguageDeleteQuery);
  if (respData != 0) {
    res.status(200).send({
      status: 200,
      message: "Deleted successfully",
    });
  } else {
    res.status(209).send({
      status: 209,
      message: "Not removed",
    });
  }
}

async function campaignImageDelete(req, res) {
  var campaign_id = req.params.campaign_id;
  var campaign_images_id = req.body.campaign_images_id;

  const campaignImageDeleteQuery = campaign_images_id.map(async (item) => {
    var campaign_image_find_query = await tableNames.campaignImages.findAll({
      where: {
        campaign_id: campaign_id,
        campaign_images_id: item,
      },
    });

    if (campaign_image_find_query == "") {
      return res.status(200).send({
        status: 200,
        message: "Already deleted",
      });
    } else {
      return (deleteQuery = await tableNames.campaignImages.destroy({
        where: {
          campaign_id: campaign_id,
          campaign_images_id: item,
        },
      }));
    }
  });

  const respData = await Promise.all(campaignImageDeleteQuery);
  if (respData != 0) {
    res.status(200).send({
      status: 200,
      message: "Deleted successfully",
    });
  } else {
    res.status(209).send({
      status: 209,
      message: "Not removed",
    });
  }
}

async function getCampaignImages(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;
  var campaign_id = req.params.campaign_id;

  const findQuery = await tableNames.campaignImages.findAll({
    where: {
      campaign_id: campaign_id,
    },

    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });
  success(res, "Campaign Images Found", "Campaign images Not Found", findQuery);
}

//CAMPAIGN_DELIVERABLES DELETE SECTION
// async function campaignDeliverablesDelete(req, res) {
//   var campaign_deliverables_id = req.params.campaign_deliverables_id.split(",");

//   console.log(campaign_deliverables_id);

//   if (campaign_deliverables_id == null || campaign_deliverables_id == "") {
//     res.status(209).send({
//       status: 209,
//       message: "Campaign deliverables id not selected",
//     });
//   }

//   const campaignDeliverablesDeleteQuery = campaign_deliverables_id.map(
//     async (item) => {
//       var campaign_Deliverables_find_query =
//         await tableNames.campaignDeliverables.findAll({
//           where: {
//             campaign_deliverables_id: item,
//           },
//         });

//       if (campaign_Deliverables_find_query == "") {
//         return res.status(200).send({
//           status: 200,
//           message: "Already deleted",
//         });
//       } else {
//         return (deleteQuery = await tableNames.campaignDeliverables.destroy({
//           where: {
//             campaign_deliverables_id: item,
//           },
//         }));
//       }
//     }
//   );

//   const respData = await Promise.all(campaignDeliverablesDeleteQuery);
//   if (respData != 0) {
//     res.status(200).send({
//       status: 200,
//       message: "Deleted successfully",
//     });
//   } else {
//     res.status(209).send({
//       status: 209,
//       message: "Not removed",
//     });
//   }
// }

async function campaignDeliverablesDelete(req, res) {
  var campaign_deliverables_id = req.params.campaign_deliverables_id.split(",");

  if (campaign_deliverables_id == null || campaign_deliverables_id == "") {
    return res.status(209).json({
      status: 209,
      message: "Campaign deliverables id not selected",
    });
  }

  const campaignDeliverablesfindQuery = campaign_deliverables_id.map(
    async (item) => {
      var campaign_Deliverables_find_query =
        await tableNames.campaignDeliverables.findOne({
          where: {
            campaign_deliverables_id: item,
          },
        });

      return campaign_Deliverables_find_query;
    }
  );
  var DeliverablesfindData = await Promise.all(campaignDeliverablesfindQuery);

  if (DeliverablesfindData[0] == null || DeliverablesfindData[0].length == 0) {
    return res.status(200).json({
      status: 200,
      message: `Campaign deliverable with ID already deleted`,
    });
  } else {
    const campaignDeliverablesDeleteQuery = campaign_deliverables_id.map(
      async (item) => {
        try {
          await tableNames.campaignDeliverables.destroy({
            where: {
              campaign_deliverables_id: item,
            },
          });
        } catch (error) {
          console.error("Error:", error);
          // Handle error and return an appropriate response
          return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
          });
        }
      }
    );

    try {
      // Use Promise.all to wait for all delete operations to complete
      await Promise.all(campaignDeliverablesDeleteQuery);

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle error and return an appropriate response
      res.status(209).json({
        status: 209,
        message: "Not removed",
      });
    }
  }
}
module.exports = {
  getAllCampaign,
  deleteCampaign,
  editCampaign,
  addCampaign,
  getCampaignDetails,
  contentNicheDelete,
  platformDelete,
  campaignLanguageDelete,
  campaignImageDelete,
  getCampaignImages,
  campaignDeliverablesDelete,
};
