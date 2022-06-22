import signIn from '../src/auth/api/sign-in.js';
import signUp from '../src/auth/api/sign-up.js';
import listCountries from '../src/countries/api/list-countries.js';
import getStatistics from '../src/countries/api/get-statistics.js';

export default {
    'openapi': '3.0.3',
    'info': {
        'version': '0.4.0',
        'title': 'Covid19 API'
    },
    'components': {
        'securitySchemes': {
            'bearerAuth': {
                'type': 'http',
                'scheme': 'bearer',
                'bearerFormat': 'JWT'
            }
        }
    },
    'tags': [{ 'name': 'countries' }, { 'name': 'auth' }],
    'paths': {
        [signUp.path]: {
            [signUp.method.toLowerCase()]: {
                'tags': ['auth'],
                'requestBody': {
                    'required': true,
                    'content': {
                        'application/json': {
                            'schema': signUp.schema.body
                        }
                    }
                },
                'responses': {
                    200: {
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        'id': {
                                            'type': 'string',
                                            'format': 'uuid'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        [signIn.path]: {
            [signIn.method.toLowerCase()]: {
                'tags': ['auth'],
                'requestBody': {
                    'required': true,
                    'content': {
                        'application/json': {
                            'schema': signIn.schema.body
                        }
                    }
                },
                'responses': {
                    200: {
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        'token': {
                                            'type': 'string',
                                            'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0YTBhNWZiLTVhOGYtNGFkOS1hZGRlLTc5NzA0NDcxODQ0NiIsImlhdCI6MTY1NTg5NjkyMn0.ep_uAvJU4iPc7ctyBDgQw7gY69Dzryb4ncQWXmJHzE0'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        [listCountries.path]: {
            [listCountries.method.toLowerCase()]: {
                'tags': ['countries'],
                'security': [{ 'bearerAuth': [] }],
                'responses': {
                    200: {
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'object',
                                        'properties': {
                                            'id': {
                                                'type': 'string',
                                                'format': 'uuid'
                                            },
                                            'code': {
                                                'type': 'string',
                                                'example': 'UA'
                                            },
                                            'name': {
                                                'type': 'object',
                                                'properties': {
                                                    'en': {
                                                        'type': 'string',
                                                        'example': 'Ukraine'
                                                    },
                                                    'ka': {
                                                        'type': 'string',
                                                        'example': 'უკრაინა'
                                                    }
                                                }
                                            },
                                            'created_at': {
                                                'type': 'string',
                                                'format': 'date-time'
                                            },
                                            'updated_at': {
                                                'type': 'string',
                                                'format': 'date-time'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        [getStatistics.path]: {
            [getStatistics.method.toLowerCase()]: {
                'tags': ['countries'],
                'security': [{ 'bearerAuth': [] }],
                'requestBody': {
                    'required': true,
                    'content': {
                        'application/json': {
                            'schema': getStatistics.schema.body
                        }
                    }
                },
                'responses': {
                    200: {
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'object',
                                        'properties': {
                                            'id': {
                                                'type': 'string',
                                                'format': 'uuid'
                                            },
                                            'code': {
                                                'type': 'string',
                                                'example': 'UA'
                                            },
                                            'country': {
                                                'type': 'string',
                                                'example': 'Ukraine'
                                            },
                                            'confirmed': {
                                                'type': 'integer',
                                                'example': 730
                                            },
                                            'recovered': {
                                                'type': 'integer',
                                                'example': 4928
                                            },
                                            'deaths': {
                                                'type': 'integer',
                                                'example': 545
                                            },
                                            'created_at': {
                                                'type': 'string',
                                                'format': 'date-time'
                                            },
                                            'updated_at': {
                                                'type': 'string',
                                                'format': 'date-time'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};