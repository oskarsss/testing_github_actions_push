const fields = Object.freeze({
    email: 'emailField',
    password: 'passwordField'
});
const testIds = Object.freeze({
    pages: {
        login: {
            fields: {
                email: fields.email, //+
                password: fields.password, //+
                forgotPassword: 'forgotPasswordEmailField' //+
            },
            links: {
                forgotPassword: 'forgotPasswordLink' //+
            },
            buttons: {
                login: 'loginBtn', //+
                sendResetLink: 'sendResetLinkBtn', //+
                backToLogin: 'backToLoginBtn', //+
                createAccount: 'createAccountBtn' //+
            },
            areas: {
                login: 'mainLoginContainer' //+
            }
        },
        createAccount: {
            fields: {
                firstName: 'firstNameField', //+
                lastName: 'lastNameField', //+
                phoneNumber: 'phoneNumberField', //+
                email: 'emailFieldInCreateAccount', //+
                password: 'passwordFieldInCreateAccount', //+
                dot: 'DOTField', //+
                referalCode: 'referalCodeField' //+
            },
            links: {
                backToLogin: 'backToLoginLink' //+
            },
            buttons: {
                createAccount: 'createAccountBtn' //+
            }
        },
        navigation: {
            links: {
                home: 'homePageLink', //+
                loadboard: 'loadboardLink', //+
                dashboard: 'dashboardLink', //+
                dispatchSchedule: 'dispatchSchedule', //+
                dispatchLoads: 'dispatchLoads', //+
                dispatchBrokers: 'dispatchBrokers', //+
                dispatchCustomers: 'dispatchCustomers', //+
                fleetPlates: 'fleetPlates', //+
                fleetTrailers: 'fleetTrailers', //+
                fleetVendors: 'fleetVendors', //+
                fleetDrivers: 'fleetDrivers', //+
                fleetTrucks: 'fleetTrucks', //+
                billingAll: 'billingAll', //+
                billingFactoring: 'billingFactoring', //+
                billingDirect: 'billingDirect', //+
                billingAmazon: 'billingAmazon', //+
                accountingSettlements: 'accountingSettlements', //+
                accountingRecurringTransaction: 'accountingRecurringTransaction', //+
                accountingTolls: 'accountingTolls', //+
                accountingFuel: 'accountingFuel', //+
                accountingDispatchers: 'accountingDispatchers', //+
                reportsIFTA: 'reportsIFTA', //+
                reportsOregon: 'reportsOregon',
                settings: 'settingsMenu', //+
                settingsPassword: 'settingsPassword',
                settingsTeam: 'settingsTeam',
                settingsRoles: 'settingsRoles',
                settingsCompany: 'settingsCompany',
                settingsBilling: 'settingsBilling',
                settingsSecurity: 'settingsSecurity',
                settingsIntegrations: 'settingsIntegrations',
                settingsInvoicingGeneral: 'settingsInvoicingGeneral',
                settingsFactoringCompanies: 'settingsFactoringCompanies',
                settingsSettlementsGeneral: 'settingsSettlementsGeneral',
                settingsCycles: 'settingsCycles',
                settingsRevenueTypes: 'settingsRevenueTypes',
                settingsCredit: 'settingsCredit',
                settingsDebit: 'settingsDebit',
                settingsDocuments: 'settingsDocuments',
                settingsDriverPay: 'settingsDriverPay',
                settingsInvoiceItem: 'settingsInvoiceItem',
                help: 'helpMenu'
            },
            buttons: {
                dispatchMenu: 'dispatchMenu', //+
                fleetMenu: 'fleetMenuBtn', //+
                billingMenu: 'billingMenuBtn', //+
                accountingMenu: 'accountingMenuBtn', //+
                reportsMenu: 'reportsMenuBtn' //+
            }
        },
        dispatchSchedule: {
            fields: {
                search: 'scheduleSearchField' //+
            },
            buttons: {
                capList: 'capListBtn', //+
                addTimeOff: 'addTimeOffBtn', //+
                newLoad: 'newLoadBtn' //+
            }
        },
        createLoad: {
            fields: {
                customer: 'customerField', //+
                broker: 'brokerField',
                loadRef: 'loadRefField',
                clientRep: 'clientRepField',
                bookingDispatch: 'bookingDispatchField',
                equipmentType: 'equipmentTypeField',
                loadType: 'loadTypeField',
                weight: 'weightField',
                commodity: 'commodityField',
                loadDetailsNote: 'loadDetailsNoteField',
                stops: 'stopsField',
                miles: 'milesField',
                emptyMiles: 'emptyMilesField',
                loadedMiles: 'loadedMilesField',
                time: 'timeField',
                stopItemContainer: 'StopItemContainer',
                changeTypeMenu: 'changeTypeMenu',
                stopRefID: 'stopReferenceIDField',
                stopLocation: 'stopLocationAddressField',
                stopFixedAppt: 'stopFixedAppointmentCheckbox',
                stopStart: 'stopStartAppointmentField',
                stopEnd: 'stopEndAppointmentField',
                stopNotes: 'stopNotesField',
                invoicingCategory: 'invoicingCategoryField',
                invoicingUnits: 'invoicingUnitsField',
                invoicingRate: 'invoicingRateField',
                invoicingTotal: 'invoicingTotal',
                totalSumInvoicing: 'totalSumInvoicing',
                rateConDrop: 'rateConfirmationDropZone'
            },
            buttons: {
                addNewDraft: 'addNewDraftBtn',
                deleteDraftIcon: 'deleteDraftSvgBtn',
                clearAllDrafts: 'clearAllDraftsBtn',
                help: 'helpBtn',
                closeDraftsPage: 'closeDraftsPageBtn',
                addStop: 'addStopBtn',
                changeStopType: 'changeStopTypeBtn',
                moveDown: 'moveDownBtn',
                moveUp: 'moveUpBtn',
                deleteStop: 'deleteStopBtn',
                deleteInvoicing: 'deleteInvoicingBtn',
                deleteDraft: 'deleteDraftBtn',
                submitLoad: 'submitLoadBtn'
            }
        },
        brokerDialog: {
            fields: {
                mc: 'brokerMcField',
                name: 'brokerNameField',
                phone: 'brokerPhoneField',
                email: 'brokerEmailField',
                address: 'brokerAddressField'
            },
            buttons: {
                saferLookupLink: 'SaferLookupLinkBtn'
            }
        },
        fleetPlates: {
            fields: {
                company: 'companyField', //+
                type: 'typeField', //+
                search: 'fleetPlatesSearchField', //+
                ownerName: 'ownerNameField', //+
                state: 'stateFieldAddPlate', //+
                stateCalifornia: 'stateCaliforniaOption', //+
                plateNumber: 'plateNumberField', //+
                annualCost: 'annualCostField', //+
                ownerCheckbox: 'ownerCheckbox' //+
            },
            buttons: {
                addPlate: 'addPlateBtn', //+
                cancelAddingPlate: 'cancelAddingPlateBtn', //+
                confirmAddingPlate: 'confirmAddingPlateBtn' //+
            },
            areas: {
                addPlateModal: 'addPlateModalWindow' //+
            }
        },
        fleetTrailers: {
            fields: {
                search: 'fleetTrailersSearchField', //+
                company: 'companyField',
                ownership: 'ownershipField', //+
                plateCompany: 'plateCompanyField', //+
                type: 'typeField', //+
                number: 'numberField', //+
                VIN: 'VINField', //+
                rentMonthly: 'rentMonthlyField', //+
                deposit: 'depositField', //+
                driverRent: 'driverRentField' //+
            },
            buttons: {
                companies: 'companiesBtn',
                trailers: 'trailersBtn',
                addCompany: 'companiesBtn',
                addTrailer: 'addTrailerBtn', //+
                import: 'importBtn', //+
                cancelAddingTrailer: 'cancelAddingTrailerBtn', //+
                confirmAddingTrailer: 'confirmAddingTrailerBtn' //+
            },
            areas: {
                addTrailerModal: 'addTrailerModalWindow' //+
            }
        },
        editTrailer: {
            fields: {
                number: 'numberField', //+
                status: 'statusField', //+
                VIN: 'VINField', //+
                year: 'yearField', //+
                make: 'makeField', //+
                model: 'modelField', //+
                plateCompany: 'plateCompanyField', //+
                company: 'companyField',
                ownership: 'ownershipField', //+
                type: 'typeField', //+
                tags: 'tagsField', //+
                rentMonthly: 'rentMonthlyField', //+
                deposit: 'depositField', //+
                driverRent: 'driverRentField', //+
                message: 'messageField',
                dropDocument: 'dropDocument'
            },
            buttons: {
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentCenterBtn',
                addCompany: 'addCompanyBtn',
                saveTrailerEditing: 'saveTrailerEditingBtn', //+
                sendMessage: 'sendMessageBtn',
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                deleteTrailer: 'deleteTrailerBtn', //+
                close: 'closeEditTruckBtn', //+
                cancelDeleteTrailer: 'cancelDeleteTrailerBtn', //+
                confirmDeleteTrailer: 'confirmDeleteTrailerBtn' //+
            },
            areas: {
                messageBox: 'messageContainer'
            }
        },
        trailerProfile: {
            fields: {
                message: 'messageField',
                dropDocument: 'dropDocument',
                company: 'companyField',
                companyName: 'companyNameField',
                companyPhone: 'companyPhoneField',
                companyEmail: 'companyEmailField',
                garageLocation: 'garageLocationField'
            },
            buttons: {
                edit: 'editBtn',
                activity: 'activityBtn',
                documents: 'documentsBtn',
                leaveNote: 'leaveNoteBtn',
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentBtnCenter',
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                assignTruck: 'assignTruckBtn',
                confirmAssignTruck: 'confirmAssignTruckBtn',
                removeTruck: 'removeTruckBtn',
                assignCompany: 'assignCompanyBtn',
                addCompany: 'addCompanyBtn',
                confirmAddCompany: 'confirmAddingCompanyBtn',
                confirmSelectingCompany: 'confirmSelectingCompanyBtn',
                removeCompany: 'removeCompanyBtn',
                saveGarageLocation: 'saveGarageLocationBtn'
            },
            areas: {
                messageBox: 'messageContainer'
            }
        },
        trailersCompanies: {
            fields: {
                search: 'companiesSearchField', //+
                companyName: 'companyNameField', //+
                companyPhone: 'companyPhoneField', //+
                companyEmail: 'companyEmailField' //+
            },
            buttons: {
                addCompany: 'addCompanyBtn', //+
                cancelCompany: 'cancelAddingCompanyBtn', //+
                saveCompany: 'saveAddingCompanyBtn' //+
            },
            areas: {
                addCompanyModal: 'addCompanyModal' //+
            }
        },
        fleetVendors: {
            fields: {
                search: 'fleetVendorsSearchField', //+
                vendorsName: 'vendorsNameField', //+
                vendorsType: 'vendorsTypeField' //+
            },
            buttons: {
                addVendor: 'addVendorBtn', //+
                confirmVendor: 'confirmVendorBtn', //+
                cancelVendor: 'cancelVendorBtn' //+
            }
        },
        editVendor: {
            fields: {
                name: 'basicDetailsNameField', //+
                friendlyName: 'basicDetailsFriendlyNameField', //+
                vendorsType: 'vendorsTypeField', //+
                email: 'basicDetailsEmailField', //+
                addressState: 'addressStateField', //+
                addressLine1: 'addressLine1Field', //+
                addressLine2: 'addressLine2Field', //+
                city: 'cityField', //+
                postalCode: 'postalCodeField', //+
                taxID: 'taxIDField', //+
                contactName: 'contactNameField', //+
                contactEmail: 'contactEmailField', //+
                contactPhone: 'contactPhoneField', //+
                dropDocument: 'dropDocumentField'
            },
            buttons: {
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentCenterBtn',
                updateVendor: 'updateVendorBtn', //+
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                closeEditVendor: 'closeEditVendorBtn' //+
            }
        },
        fleetDrivers: {
            fields: {
                search: 'fleetDriversSearchField', //+
                driversFirstName: 'driversFirstNameField', //+
                driversLastName: 'driversLastNameField', //+
                driversType: 'driversTypeField' //+
            },
            buttons: {
                addDriver: 'addDriverBtn', //+
                import: 'importBtn', //+
                cancelAddingDriver: 'cancelAddingDriverBtn', //+
                confirmAddingDriver: 'confirmAddingDriverBtn' //+
            }
        },
        editDriver: {
            fields: {
                firstName: 'driversFirstNameField', //+
                middleName: 'driversMiddleNameField', //+
                lastName: 'driversLastNameField', //+
                birthDate: 'driversBirthDateField',
                phoneNumber: 'driversPhoneNumberField', //+
                email: 'driversEmailField', //+
                friendly_name: 'driversFriendlyNameField', //+
                addressLine1: 'driversAddressLine1Field', //+
                addressLine2: 'driversAddressLine2Field', //+
                city: 'driversCityField', //+
                state: 'driversStateField', //+
                postalCode: 'driversPostalCodeField', //+
                revenueType: 'revenueTypeField', //+
                cycle: 'cycleField', //+
                vendor: 'vendorField', //+
                payoutReceiver: 'payoutReceiverField', //+
                type: 'typeField', //+
                status: 'statusField', //+
                hireDate: 'driversHireDateField', //+
                tag: 'tagField', //+
                insuranceEndorsed: 'insuranceEndorsedField', //+
                message: 'messageField',
                documentDrop: 'documentDropField'
            },
            buttons: {
                addVendor: 'addVendorBtn',
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentCenterBtn',
                save: 'saveDriverEditingBtn', //+
                sendMessage: 'sendMessageBtn',
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                deleteDriver: 'deleteDriverBtn', //+
                cancelDeleteTruck: 'cancelDeleteDriverBtn', //+
                confirmDeleteDriver: 'confirmDeleteDriverBtn', //+
                closeEditDriver: 'closeEditDriverBtn' //+
            },
            areas: {
                messageBox: 'messageContainer'
            }
        },
        driverProfile: {
            fields: {
                message: 'messageField',
                dropDocument: 'dropDocument',
                accountName: 'accountNameField',
                routingNumber: 'routingNumberField',
                accountNumber: 'accountNumberField',
                user: 'userField',
                pinnedNote: 'pinnedNoteField',
                vendor: 'vendorField'
            },
            buttons: {
                criticalNotification: 'criticalNotificationBtn',
                edit: 'editBtn',
                activity: 'activityBtn',
                documents: 'documentsBtn',
                financial: 'financialBtn',
                leaveNote: 'leaveNoteBtn',
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentBtnCenter',
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                assignTruck: 'assignTruckBtn',
                confirmAssignTruck: 'confirmAssignTruckBtn',
                removeTruck: 'removeTruckBtn',
                selectPartnerDriver: 'selectPartnerDriverBtn',
                assignPartnerDriver: 'assignPartnerDriverBtn',
                removePartnerDriver: 'removePartnerDriverBtn',
                selectVendor: 'selectVendorBtn',
                addVendor: 'addVendorBtn',
                confirmAddingVendor: 'confirmAddingVendorBtn',
                removeVendor: 'removeVendorBtn',
                addBankInfo: 'addBankInfoBtn',
                confirmAddingBankInfo: 'confirmAddingBankInfoBtn',
                removeBankInfo: 'removeBankInfoBtn',
                assignUser: 'assignUserBtn',
                confirmAssignUser: 'confirmAssignUserBtn',
                removeUser: 'removeUserBtn',
                savePinnedNote: 'savePinnedNoteBtn'
            },
            areas: {
                messageBox: 'messageContainer'
            }
        },
        fleetTrucks: {
            fields: {
                search: 'fleetTrucksSearchField', //+
                truckNumber: 'truckNumberField', //+
                truckVINNumber: 'truckVINNumberField', //+
                truckType: 'truckTypeField' //+
            },
            buttons: {
                addTruck: 'addTruckBtn', //+
                import: 'importBtn', //+
                cancelAddingTruck: 'cancelAddingTruckBtn', //+
                confirmAddingTruck: 'confirmAddingTruckBtn', //+
                edit: 'editTruckBtn', //+
                details: 'detailsTruckBtn' //+
            }
        },
        editTruck: {
            fields: {
                truckNumber: 'truckNumberField',
                status: 'statusField', //+
                VIN: 'VINField',
                year: 'yearField',
                make: 'makeField',
                model: 'modelField',
                plateCompany: 'plateCompanyField',
                type: 'typeField',
                tollTransponder: 'tollTransponderNumberField',
                tags: 'tagsField',
                color: 'colorField',
                vendor: 'vendorField',
                fuelDiscounts: 'fuelDiscountsCheckBox',
                insuranceEndorsed: 'insuranceEndorsedField',
                message: 'messageField',
                dropDocument: 'dropDocument'
            },
            buttons: {
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentCenterBtn',
                saveTruckEditing: 'saveTruckEditingBtn', //+
                addVendor: 'addVendorBtn',
                sendMessage: 'sendMessageBtn',
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                deleteTruck: 'deleteTruckBtn', //+
                close: 'closeEditTruckBtn', //+
                cancelDeleteTruck: 'cancelDeleteTruckBtn', //+
                confirmDeleteTruck: 'confirmDeleteTruckBtn' //+
            },
            areas: {
                messageBox: 'messageContainer'
            }
        },
        truckProfile: {
            fields: {
                message: 'messageField',
                dropDocument: 'dropDocument',
                primaryCheckbox: 'primaryCheckbox',
                garageLocation: 'garageLocationField',
                user: 'userField'
            },
            buttons: {
                edit: 'editBtn',
                activity: 'activityBtn',
                documents: 'documentsBtn',
                leaveNote: 'leaveNoteBtn',
                addDocument: 'addDocumentBtn',
                addDocumentCenter: 'addDocumentBtnCenter',
                deleteDocumentIcon: 'deleteDocumentIconBtn',
                confirmDeleteDocument: 'confirmDeleteDocumentBtn',
                assignDriver: 'assignDriverBtn',
                confirmAssignDriver: 'confirmAssignDriverBtn',
                removeDriver: 'removeDriverBtn',
                assignTrailer: 'assignTrailerBtn',
                confirmAssignTrailer: 'confirmAssignTrailerBtn',
                removeTrailer: 'removeTrailerBtn',
                saveGarageLocation: 'saveGarageLocationBtn',
                assignUser: 'assignUserBtn',
                confirmAssignUser: 'confirmAssignUserBtn',
                removeUser: 'removeUserBtn'
            },
            areas: {
                messageBox: 'messageContainer'
            }
        },
        settingsProfile: {
            fields: {
                firstName: 'firstNameField', //+
                lastName: 'lastNameField', //+
                phoneNumber: 'phoneNumberField', //+
                email: 'emailField', //+
                secondStepVerification: 'secondStepVerificationField' //+
            },
            buttons: {
                cancel: 'cancelBtn', //+
                update: 'updateBtn' //+
            }
        },
        settingsPassword: {
            fields: {
                currentPassword: 'currentPasswordField', //+
                newPassword: 'newPasswordField', //+
                confirmPassword: 'confirmPasswordField' //+
            },
            buttons: {
                changePassword: 'changePasswordBtn' //+
            }
        },
        settingsTeam: {
            fields: {
                search: 'teamSearchField',
                firstName: 'firstNameField',
                lastName: 'lastNameField',
                title: 'titleField',
                phoneNumber: 'phoneNumberField',
                email: 'emailField',
                password: 'passwordField',
                role: 'roleField',
                status: 'statusField',
                secondStepVerificationCheckbox: 'secondStepVerificationCheckbox',
                pwChangeCheckbox: 'pwChangeCheckbox'
            },
            buttons: {
                import: 'importBtn',
                add: 'addBtn',
                invite: 'inviteBtn',
                cancelAddingUser: 'cancelAddingUserBtn',
                confirmAddingUser: 'confirmAddingUserBtn'
            }
        },
        settingsRoles: {
            fields: {},
            buttons: {
                addRole: 'addRoleBtn'
            }
        }
    },
    components: {
        select: {
            status: {
                optionPrefix: 'status-select-option-' //+
            },
            state: {
                optionPrefix: 'state-select-option-' //+
            },
            plateCompany: {
                optionPrefix: 'plate-company-select-option-' //+
            },
            tags: {
                optionPrefix: 'tags-select-option-'
            },
            color: {
                optionPrefix: 'colors-select-option-' //+
            },
            vendor: {
                optionPrefix: 'vendor-select-option-' //+
            },
            trailerCompany: {
                optionPrefix: 'trailer-company-select-option-' //+
            },
            trailerOwnership: {
                optionPrefix: 'trailer-ownership-select-option-'
            },
            trailerType: {
                optionPrefix: 'trailer-type-select-option-' //+
            },
            documentType: {
                optionPrefix: 'document-type-select-option-'
            },
            revenueType: {
                optionPrefix: 'revenue-type-select-option-' //+
            },
            cycle: {
                optionPrefix: 'cycle-select-option-' //+
            },
            driverType: {
                optionPrefix: 'driver-type-select-option-' //+
            },
            stopChangeType: {
                optionPrefix: 'stop-change-type-option-'
            },
            payItemCategory: {
                optionPrefix: 'pay-item-option-prefix-'
            },
            bookingDispatch: {
                optionPrefix: 'booking-dispatch-option-'
            },
            equipmentType: {
                optionPrefix: 'equipment-type-option-'
            },
            loadType: {
                optionPrefix: 'load-type-option-'
            },
            truckType: {
                optionPrefix: 'truck-type-select-option-' //+
            }
        },
        coreTable: 'coreTable', //+
        pagination: {
            nextPage: 'nextPageBtn', //+
            previousPage: 'previousPageBtn' //+
        }
    }
});
export default testIds;
