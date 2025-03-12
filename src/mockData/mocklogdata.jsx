import React from 'react'

const mocklogdata = {
    "SOURCING": [
        {
            "taskId": "consent_send_otp",
            "order": 101,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:00:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:01:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T10:03:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:05:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:07:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "consent_verify_otp",
            "order": 103,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:08:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:09:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T10:11:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:13:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:15:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "basic_detail_submit",
            "order": 104,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:16:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:17:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T10:19:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:21:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:23:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "dob_check",
            "order": 105,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:24:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:25:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:27:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:29:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "ogl_check",
            "order": 106,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:30:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:31:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:33:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:35:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "fraud_check",
            "order": 109,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:36:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:37:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:39:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:41:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "current_address_capture",
            "order": 110,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:42:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:43:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T10:45:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:47:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:49:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:57:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:59:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T13:01:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "additional_contact_detail_capture",
            "order": 111,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:50:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:51:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T10:53:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T10:55:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T10:57:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "personal_detail_capture",
            "order": 112,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T10:58:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T10:59:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T11:01:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:03:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:05:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "employment_detail_capture",
            "order": 114,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:06:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:07:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T11:09:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:11:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:13:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "banking_mandatory",
            "order": 115,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:14:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:15:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T11:17:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:19:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:21:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "add_asset",
            "order": 130,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:22:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:23:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T11:25:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:27:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:29:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "init_credit_flow",
            "order": 131,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:36:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:37:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:39:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:41:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "cibil_pull",
            "order": 150,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:30:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:31:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:33:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:35:00.000+00:00"
                }
            ]
        }
    ],
    "CONVERSION": [
        {
            "taskId": "sendback",
            "order": 110,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:48:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:49:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:51:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:53:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:55:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "initiate_offer_approval",
            "order": 301,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:24:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:25:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:27:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:29:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:31:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "terms_generation",
            "order": 303,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:32:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:33:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:35:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:37:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:39:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "action_on_terms",
            "order": 304,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:40:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:41:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:43:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:45:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:47:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "doc_upload",
            "order": 305,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T13:02:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T13:03:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T13:05:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T13:07:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T13:09:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "additional_info",
            "order": 306,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T13:10:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T13:11:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T13:13:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T13:15:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T13:17:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "add_beneficiary_details",
            "order": 307,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T13:18:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T13:19:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T13:21:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T13:23:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T13:25:00.000+00:00"
                }
            ]
        }
    ],
    "CREDIT": [
        {
            "taskId": "cibil_pull",
            "order": 201,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:42:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:43:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:45:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:47:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "cars24_cibil_based_offer",
            "order": 202,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:48:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:49:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:51:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:53:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "start_credit_workflow",
            "order": 203,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T11:54:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T11:55:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T11:57:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T11:59:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "dc_approve",
            "order": 204,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:00:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:01:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:03:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:05:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:07:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "tvr_approve",
            "order": 212,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:08:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:09:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:11:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:13:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:15:00.000+00:00"
                }
            ]
        },
        {
            "taskId": "tvr_offer_approve",
            "order": 220,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T12:16:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T12:17:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T12:19:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T12:21:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T12:23:00.000+00:00"
                }
            ]
        }
    ],
    "RISK": [
        {
            "taskId": "fcu_checks",
            "order": 402,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T13:26:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T13:27:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T13:29:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T13:31:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T13:33:00.000+00:00"
                }
            ]
        }
    ],
    "RTO": [
        {
            "taskId": "rto_completion",
            "order": 601,
            "handledBy": "john.doe@cars24.com",
            "createdAt": "2025-03-10T13:34:00.000+00:00",
            "statusHistory": [
                {
                    "status": "NEW",
                    "updatedAt": "2025-03-10T13:35:00.000+00:00"
                },
                {
                    "status": "TODO",
                    "updatedAt": "2025-03-10T13:37:00.000+00:00"
                },
                {
                    "status": "IN_PROGRESS",
                    "updatedAt": "2025-03-10T13:39:00.000+00:00"
                },
                {
                    "status": "COMPLETED",
                    "updatedAt": "2025-03-10T13:41:00.000+00:00"
                }
            ]
        }
    ]
}

export default mocklogdata;