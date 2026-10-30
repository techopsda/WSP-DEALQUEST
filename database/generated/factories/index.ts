import type { Organisation } from "@prisma/client";
import type { Permission } from "@prisma/client";
import type { Role } from "@prisma/client";
import type { RolePermission } from "@prisma/client";
import type { User } from "@prisma/client";
import type { UserOrganisation } from "@prisma/client";
import type { UserOrganisationRole } from "@prisma/client";
import type { UserRole } from "@prisma/client";
import type { AccountsSheet } from "@prisma/client";
import type { Answer } from "@prisma/client";
import type { Auction } from "@prisma/client";
import type { BalanceSheet } from "@prisma/client";
import type { Bid } from "@prisma/client";
import type { Company } from "@prisma/client";
import type { Earnings } from "@prisma/client";
import type { Finance } from "@prisma/client";
import type { Game } from "@prisma/client";
import type { GlobalEvent } from "@prisma/client";
import type { JobTitle } from "@prisma/client";
import type { LocalEvent } from "@prisma/client";
import type { Member } from "@prisma/client";
import type { Notification } from "@prisma/client";
import type { Period } from "@prisma/client";
import type { Question } from "@prisma/client";
import type { Sector } from "@prisma/client";
import type { Setting } from "@prisma/client";
import type { Team } from "@prisma/client";
import type { TeamCompany } from "@prisma/client";
import type { TeamLocalEvent } from "@prisma/client";
import type { TeamQuestion } from "@prisma/client";
import type { Tournament } from "@prisma/client";
import type { PeriodType } from "@prisma/client";
import type { GameStatus } from "@prisma/client";
import type { GlobalEventType } from "@prisma/client";
import type { LocalEventType } from "@prisma/client";
import type { NotificationType } from "@prisma/client";
import type { QuestionType } from "@prisma/client";
import type { TeamStatus } from "@prisma/client";
import type { TournamentStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";
import { getClient, ModelWithFields, createScreener, getScalarFieldValueGenerator, Resolver, normalizeResolver, normalizeList, getSequenceCounter, } from "@quramy/prisma-fabbrica/lib/internal";
export { initialize, resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions = {
    readonly seq: number;
};

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "Organisation",
        fields: [{
                name: "users",
                type: "UserOrganisation",
                relationName: "OrganisationToUserOrganisation"
            }, {
                name: "parent",
                type: "Organisation",
                relationName: "parentChild"
            }, {
                name: "children",
                type: "Organisation",
                relationName: "parentChild"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "OrganisationCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "OrganisationModifiedBy"
            }]
    }, {
        name: "Permission",
        fields: [{
                name: "roles",
                type: "RolePermission",
                relationName: "PermissionToRolePermission"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "PermissionCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "PermissionModifiedBy"
            }]
    }, {
        name: "Role",
        fields: [{
                name: "userOrganisations",
                type: "UserOrganisationRole",
                relationName: "RoleToUserOrganisationRole"
            }, {
                name: "permissions",
                type: "RolePermission",
                relationName: "RoleToRolePermission"
            }, {
                name: "users",
                type: "UserRole",
                relationName: "RoleToUserRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "RoleCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "RoleModifiedBy"
            }]
    }, {
        name: "RolePermission",
        fields: [{
                name: "role",
                type: "Role",
                relationName: "RoleToRolePermission"
            }, {
                name: "permission",
                type: "Permission",
                relationName: "PermissionToRolePermission"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "RolePermissionCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "RolePermissionModifiedBy"
            }]
    }, {
        name: "User",
        fields: [{
                name: "organisations",
                type: "UserOrganisation",
                relationName: "UserToUserOrganisation"
            }, {
                name: "roles",
                type: "UserRole",
                relationName: "UserToUserRole"
            }, {
                name: "OrganisationCreated",
                type: "Organisation",
                relationName: "OrganisationCreatedBy"
            }, {
                name: "OrganisationModified",
                type: "Organisation",
                relationName: "OrganisationModifiedBy"
            }, {
                name: "PermissionCreated",
                type: "Permission",
                relationName: "PermissionCreatedBy"
            }, {
                name: "PermissionModified",
                type: "Permission",
                relationName: "PermissionModifiedBy"
            }, {
                name: "RoleCreated",
                type: "Role",
                relationName: "RoleCreatedBy"
            }, {
                name: "RoleModified",
                type: "Role",
                relationName: "RoleModifiedBy"
            }, {
                name: "RolePermissionCreated",
                type: "RolePermission",
                relationName: "RolePermissionCreatedBy"
            }, {
                name: "RolePermissionModified",
                type: "RolePermission",
                relationName: "RolePermissionModifiedBy"
            }, {
                name: "UserOrganisationCreated",
                type: "UserOrganisation",
                relationName: "UserOrganisationCreatedBy"
            }, {
                name: "UserOrganisationModified",
                type: "UserOrganisation",
                relationName: "UserOrganisationModifiedBy"
            }, {
                name: "UserRoleCreated",
                type: "UserRole",
                relationName: "UserRoleCreatedBy"
            }, {
                name: "UserRoleModified",
                type: "UserRole",
                relationName: "UserRoleModifiedBy"
            }, {
                name: "UserOrganisationRoleCreated",
                type: "UserOrganisationRole",
                relationName: "UserOrganisationRoleCreatedBy"
            }, {
                name: "UserOrganisationRoleModified",
                type: "UserOrganisationRole",
                relationName: "UserOrganisationRoleModifiedBy"
            }, {
                name: "TournamentCreated",
                type: "Tournament",
                relationName: "TournamentCreatedBy"
            }, {
                name: "TournamentModified",
                type: "Tournament",
                relationName: "TournamentModifiedBy"
            }, {
                name: "TeamQuestionCreated",
                type: "TeamQuestion",
                relationName: "TeamQuestionCreatedBy"
            }, {
                name: "TeamQuestionModified",
                type: "TeamQuestion",
                relationName: "TeamQuestionModifiedBy"
            }, {
                name: "BidCreated",
                type: "Bid",
                relationName: "BidCreatedBy"
            }, {
                name: "BidModified",
                type: "Bid",
                relationName: "BidModifiedBy"
            }, {
                name: "NotificationCreated",
                type: "Notification",
                relationName: "NotificationCreatedBy"
            }, {
                name: "NotificationModified",
                type: "Notification",
                relationName: "NotificationModifiedBy"
            }]
    }, {
        name: "UserOrganisation",
        fields: [{
                name: "user",
                type: "User",
                relationName: "UserToUserOrganisation"
            }, {
                name: "organisation",
                type: "Organisation",
                relationName: "OrganisationToUserOrganisation"
            }, {
                name: "roles",
                type: "UserOrganisationRole",
                relationName: "UserOrganisationToUserOrganisationRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "UserOrganisationCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserOrganisationModifiedBy"
            }]
    }, {
        name: "UserOrganisationRole",
        fields: [{
                name: "userOrganisation",
                type: "UserOrganisation",
                relationName: "UserOrganisationToUserOrganisationRole"
            }, {
                name: "role",
                type: "Role",
                relationName: "RoleToUserOrganisationRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "UserOrganisationRoleCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserOrganisationRoleModifiedBy"
            }]
    }, {
        name: "UserRole",
        fields: [{
                name: "user",
                type: "User",
                relationName: "UserToUserRole"
            }, {
                name: "role",
                type: "Role",
                relationName: "RoleToUserRole"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "UserRoleCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserRoleModifiedBy"
            }]
    }, {
        name: "AccountsSheet",
        fields: [{
                name: "team",
                type: "Team",
                relationName: "AccountsSheetToTeam"
            }]
    }, {
        name: "Answer",
        fields: [{
                name: "question",
                type: "Question",
                relationName: "AnswerToQuestion"
            }, {
                name: "correctQuestion",
                type: "Question",
                relationName: "correctAnswer"
            }, {
                name: "teamQuestion",
                type: "TeamQuestion",
                relationName: "AnswerToTeamQuestion"
            }]
    }, {
        name: "Auction",
        fields: [{
                name: "company",
                type: "Company",
                relationName: "AuctionToCompany"
            }, {
                name: "game",
                type: "Game",
                relationName: "AuctionToGame"
            }, {
                name: "bid",
                type: "Bid",
                relationName: "AuctionToBid"
            }]
    }, {
        name: "BalanceSheet",
        fields: [{
                name: "team",
                type: "Team",
                relationName: "BalanceSheetToTeam"
            }]
    }, {
        name: "Bid",
        fields: [{
                name: "auction",
                type: "Auction",
                relationName: "AuctionToBid"
            }, {
                name: "company",
                type: "Company",
                relationName: "BidToCompany"
            }, {
                name: "game",
                type: "Game",
                relationName: "BidToGame"
            }, {
                name: "team",
                type: "Team",
                relationName: "BidToTeam"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "BidCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "BidModifiedBy"
            }]
    }, {
        name: "Company",
        fields: [{
                name: "auction",
                type: "Auction",
                relationName: "AuctionToCompany"
            }, {
                name: "bid",
                type: "Bid",
                relationName: "BidToCompany"
            }, {
                name: "sector",
                type: "Sector",
                relationName: "CompanyToSector"
            }, {
                name: "earnings",
                type: "Earnings",
                relationName: "CompanyToEarnings"
            }, {
                name: "teamCompany",
                type: "TeamCompany",
                relationName: "CompanyToTeamCompany"
            }]
    }, {
        name: "Earnings",
        fields: [{
                name: "company",
                type: "Company",
                relationName: "CompanyToEarnings"
            }]
    }, {
        name: "Finance",
        fields: [{
                name: "team",
                type: "Team",
                relationName: "FinanceToTeam"
            }]
    }, {
        name: "Game",
        fields: [{
                name: "auction",
                type: "Auction",
                relationName: "AuctionToGame"
            }, {
                name: "bid",
                type: "Bid",
                relationName: "BidToGame"
            }, {
                name: "tournament",
                type: "Tournament",
                relationName: "GameToTournament"
            }, {
                name: "periodId",
                type: "Period",
                relationName: "GameToPeriod"
            }, {
                name: "notification",
                type: "Notification",
                relationName: "GameToNotification"
            }, {
                name: "team",
                type: "Team",
                relationName: "GameToTeam"
            }]
    }, {
        name: "GlobalEvent",
        fields: []
    }, {
        name: "JobTitle",
        fields: [{
                name: "member",
                type: "Member",
                relationName: "JobTitleToMember"
            }]
    }, {
        name: "LocalEvent",
        fields: [{
                name: "localEvents",
                type: "TeamLocalEvent",
                relationName: "LocalEventToTeamLocalEvent"
            }]
    }, {
        name: "Member",
        fields: [{
                name: "jobTitle",
                type: "JobTitle",
                relationName: "JobTitleToMember"
            }, {
                name: "team",
                type: "Team",
                relationName: "MemberToTeam"
            }]
    }, {
        name: "Notification",
        fields: [{
                name: "game",
                type: "Game",
                relationName: "GameToNotification"
            }, {
                name: "team",
                type: "Team",
                relationName: "NotificationToTeam"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "NotificationCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "NotificationModifiedBy"
            }]
    }, {
        name: "Period",
        fields: [{
                name: "game",
                type: "Game",
                relationName: "GameToPeriod"
            }]
    }, {
        name: "Question",
        fields: [{
                name: "answer",
                type: "Answer",
                relationName: "AnswerToQuestion"
            }, {
                name: "correctAnswer",
                type: "Answer",
                relationName: "correctAnswer"
            }, {
                name: "questions",
                type: "TeamQuestion",
                relationName: "QuestionToTeamQuestion"
            }]
    }, {
        name: "Sector",
        fields: [{
                name: "company",
                type: "Company",
                relationName: "CompanyToSector"
            }]
    }, {
        name: "Setting",
        fields: []
    }, {
        name: "Team",
        fields: [{
                name: "balanceSheet",
                type: "BalanceSheet",
                relationName: "BalanceSheetToTeam"
            }, {
                name: "bid",
                type: "Bid",
                relationName: "BidToTeam"
            }, {
                name: "finance",
                type: "Finance",
                relationName: "FinanceToTeam"
            }, {
                name: "member",
                type: "Member",
                relationName: "MemberToTeam"
            }, {
                name: "notification",
                type: "Notification",
                relationName: "NotificationToTeam"
            }, {
                name: "game",
                type: "Game",
                relationName: "GameToTeam"
            }, {
                name: "teams",
                type: "TeamQuestion",
                relationName: "TeamToTeamQuestion"
            }, {
                name: "tournament",
                type: "Tournament",
                relationName: "TeamToTournament"
            }, {
                name: "teamCompany",
                type: "TeamCompany",
                relationName: "TeamToTeamCompany"
            }, {
                name: "teamEvents",
                type: "TeamLocalEvent",
                relationName: "TeamToTeamLocalEvent"
            }, {
                name: "accountsSheet",
                type: "AccountsSheet",
                relationName: "AccountsSheetToTeam"
            }]
    }, {
        name: "TeamCompany",
        fields: [{
                name: "company",
                type: "Company",
                relationName: "CompanyToTeamCompany"
            }, {
                name: "team",
                type: "Team",
                relationName: "TeamToTeamCompany"
            }]
    }, {
        name: "TeamLocalEvent",
        fields: [{
                name: "team",
                type: "Team",
                relationName: "TeamToTeamLocalEvent"
            }, {
                name: "localEvent",
                type: "LocalEvent",
                relationName: "LocalEventToTeamLocalEvent"
            }]
    }, {
        name: "TeamQuestion",
        fields: [{
                name: "question",
                type: "Question",
                relationName: "QuestionToTeamQuestion"
            }, {
                name: "team",
                type: "Team",
                relationName: "TeamToTeamQuestion"
            }, {
                name: "selectedAnswer",
                type: "Answer",
                relationName: "AnswerToTeamQuestion"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "TeamQuestionCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "TeamQuestionModifiedBy"
            }]
    }, {
        name: "Tournament",
        fields: [{
                name: "game",
                type: "Game",
                relationName: "GameToTournament"
            }, {
                name: "team",
                type: "Team",
                relationName: "TeamToTournament"
            }, {
                name: "createdBy",
                type: "User",
                relationName: "TournamentCreatedBy"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "TournamentModifiedBy"
            }]
    }];

type OrganisationScalarOrEnumFields = {
    name: string;
};

type OrganisationparentFactory = {
    _factoryFor: "Organisation";
    build: () => PromiseLike<Prisma.OrganisationCreateNestedOneWithoutChildrenInput["create"]>;
};

type OrganisationcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutOrganisationCreatedInput["create"]>;
};

type OrganisationmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutOrganisationModifiedInput["create"]>;
};

type OrganisationFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    users?: Prisma.UserOrganisationCreateNestedManyWithoutOrganisationInput;
    parent?: OrganisationparentFactory | Prisma.OrganisationCreateNestedOneWithoutChildrenInput;
    children?: Prisma.OrganisationCreateNestedManyWithoutParentInput;
    createdBy?: OrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationCreatedInput;
    modifiedBy?: OrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationModifiedInput;
};

type OrganisationFactoryDefineOptions = {
    defaultData?: Resolver<OrganisationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<OrganisationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isOrganisationparentFactory(x: OrganisationparentFactory | Prisma.OrganisationCreateNestedOneWithoutChildrenInput | undefined): x is OrganisationparentFactory {
    return (x as any)?._factoryFor === "Organisation";
}

function isOrganisationcreatedByFactory(x: OrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationCreatedInput | undefined): x is OrganisationcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isOrganisationmodifiedByFactory(x: OrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutOrganisationModifiedInput | undefined): x is OrganisationmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type OrganisationTraitKeys<TOptions extends OrganisationFactoryDefineOptions> = keyof TOptions["traits"];

export interface OrganisationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Organisation";
    build(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Prisma.OrganisationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Prisma.OrganisationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]): PromiseLike<Prisma.OrganisationCreateInput[]>;
    pickForConnect(inputData: Organisation): Pick<Organisation, "id">;
    create(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Organisation>;
    createList(inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]): PromiseLike<Organisation[]>;
    createForConnect(inputData?: Partial<Prisma.OrganisationCreateInput>): PromiseLike<Pick<Organisation, "id">>;
}

export interface OrganisationFactoryInterface<TOptions extends OrganisationFactoryDefineOptions = OrganisationFactoryDefineOptions> extends OrganisationFactoryInterfaceWithoutTraits {
    use(name: OrganisationTraitKeys<TOptions>, ...names: readonly OrganisationTraitKeys<TOptions>[]): OrganisationFactoryInterfaceWithoutTraits;
}

function autoGenerateOrganisationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): OrganisationScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Organisation", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineOrganisationFactoryInternal<TOptions extends OrganisationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): OrganisationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly OrganisationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Organisation", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.OrganisationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateOrganisationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<OrganisationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<OrganisationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                parent: isOrganisationparentFactory(defaultData.parent) ? {
                    create: await defaultData.parent.build()
                } : defaultData.parent,
                createdBy: isOrganisationcreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isOrganisationmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.OrganisationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Organisation) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.OrganisationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().organisation.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.OrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.OrganisationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Organisation" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: OrganisationTraitKeys<TOptions>, ...names: readonly OrganisationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Organisation} model.
 *
 * @param options
 * @returns factory {@link OrganisationFactoryInterface}
 */
export function defineOrganisationFactory<TOptions extends OrganisationFactoryDefineOptions>(options?: TOptions): OrganisationFactoryInterface<TOptions> {
    return defineOrganisationFactoryInternal(options ?? {});
}

type PermissionScalarOrEnumFields = {
    name: string;
};

type PermissioncreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPermissionCreatedInput["create"]>;
};

type PermissionmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPermissionModifiedInput["create"]>;
};

type PermissionFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    roles?: Prisma.RolePermissionCreateNestedManyWithoutPermissionInput;
    createdBy?: PermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutPermissionCreatedInput;
    modifiedBy?: PermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutPermissionModifiedInput;
};

type PermissionFactoryDefineOptions = {
    defaultData?: Resolver<PermissionFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<PermissionFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isPermissioncreatedByFactory(x: PermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutPermissionCreatedInput | undefined): x is PermissioncreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isPermissionmodifiedByFactory(x: PermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutPermissionModifiedInput | undefined): x is PermissionmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type PermissionTraitKeys<TOptions extends PermissionFactoryDefineOptions> = keyof TOptions["traits"];

export interface PermissionFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Permission";
    build(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Prisma.PermissionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Prisma.PermissionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]): PromiseLike<Prisma.PermissionCreateInput[]>;
    pickForConnect(inputData: Permission): Pick<Permission, "id">;
    create(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Permission>;
    createList(inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]): PromiseLike<Permission[]>;
    createForConnect(inputData?: Partial<Prisma.PermissionCreateInput>): PromiseLike<Pick<Permission, "id">>;
}

export interface PermissionFactoryInterface<TOptions extends PermissionFactoryDefineOptions = PermissionFactoryDefineOptions> extends PermissionFactoryInterfaceWithoutTraits {
    use(name: PermissionTraitKeys<TOptions>, ...names: readonly PermissionTraitKeys<TOptions>[]): PermissionFactoryInterfaceWithoutTraits;
}

function autoGeneratePermissionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PermissionScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Permission", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function definePermissionFactoryInternal<TOptions extends PermissionFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): PermissionFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly PermissionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Permission", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.PermissionCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePermissionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PermissionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PermissionFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                createdBy: isPermissioncreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isPermissionmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.PermissionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Permission) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PermissionCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().permission.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.PermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PermissionCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Permission" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PermissionTraitKeys<TOptions>, ...names: readonly PermissionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Permission} model.
 *
 * @param options
 * @returns factory {@link PermissionFactoryInterface}
 */
export function definePermissionFactory<TOptions extends PermissionFactoryDefineOptions>(options?: TOptions): PermissionFactoryInterface<TOptions> {
    return definePermissionFactoryInternal(options ?? {});
}

type RoleScalarOrEnumFields = {
    name: string;
};

type RolecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRoleCreatedInput["create"]>;
};

type RolemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRoleModifiedInput["create"]>;
};

type RoleFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    name?: string;
    userOrganisations?: Prisma.UserOrganisationRoleCreateNestedManyWithoutRoleInput;
    permissions?: Prisma.RolePermissionCreateNestedManyWithoutRoleInput;
    users?: Prisma.UserRoleCreateNestedManyWithoutRoleInput;
    createdBy?: RolecreatedByFactory | Prisma.UserCreateNestedOneWithoutRoleCreatedInput;
    modifiedBy?: RolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutRoleModifiedInput;
};

type RoleFactoryDefineOptions = {
    defaultData?: Resolver<RoleFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RoleFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRolecreatedByFactory(x: RolecreatedByFactory | Prisma.UserCreateNestedOneWithoutRoleCreatedInput | undefined): x is RolecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isRolemodifiedByFactory(x: RolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutRoleModifiedInput | undefined): x is RolemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type RoleTraitKeys<TOptions extends RoleFactoryDefineOptions> = keyof TOptions["traits"];

export interface RoleFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Role";
    build(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Prisma.RoleCreateInput[]>;
    pickForConnect(inputData: Role): Pick<Role, "id">;
    create(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Role>;
    createList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Role[]>;
    createForConnect(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Pick<Role, "id">>;
}

export interface RoleFactoryInterface<TOptions extends RoleFactoryDefineOptions = RoleFactoryDefineOptions> extends RoleFactoryInterfaceWithoutTraits {
    use(name: RoleTraitKeys<TOptions>, ...names: readonly RoleTraitKeys<TOptions>[]): RoleFactoryInterfaceWithoutTraits;
}

function autoGenerateRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RoleScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Role", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineRoleFactoryInternal<TOptions extends RoleFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RoleFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RoleTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Role", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RoleCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRoleScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RoleFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                createdBy: isRolecreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isRolemodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.RoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Role) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RoleCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().role.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RoleCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Role" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RoleTraitKeys<TOptions>, ...names: readonly RoleTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Role} model.
 *
 * @param options
 * @returns factory {@link RoleFactoryInterface}
 */
export function defineRoleFactory<TOptions extends RoleFactoryDefineOptions>(options?: TOptions): RoleFactoryInterface<TOptions> {
    return defineRoleFactoryInternal(options ?? {});
}

type RolePermissionScalarOrEnumFields = {};

type RolePermissionroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutPermissionsInput["create"]>;
};

type RolePermissionpermissionFactory = {
    _factoryFor: "Permission";
    build: () => PromiseLike<Prisma.PermissionCreateNestedOneWithoutRolesInput["create"]>;
};

type RolePermissioncreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRolePermissionCreatedInput["create"]>;
};

type RolePermissionmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRolePermissionModifiedInput["create"]>;
};

type RolePermissionFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    role: RolePermissionroleFactory | Prisma.RoleCreateNestedOneWithoutPermissionsInput;
    permission: RolePermissionpermissionFactory | Prisma.PermissionCreateNestedOneWithoutRolesInput;
    createdBy?: RolePermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionCreatedInput;
    modifiedBy?: RolePermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionModifiedInput;
};

type RolePermissionFactoryDefineOptions = {
    defaultData: Resolver<RolePermissionFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RolePermissionFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRolePermissionroleFactory(x: RolePermissionroleFactory | Prisma.RoleCreateNestedOneWithoutPermissionsInput | undefined): x is RolePermissionroleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isRolePermissionpermissionFactory(x: RolePermissionpermissionFactory | Prisma.PermissionCreateNestedOneWithoutRolesInput | undefined): x is RolePermissionpermissionFactory {
    return (x as any)?._factoryFor === "Permission";
}

function isRolePermissioncreatedByFactory(x: RolePermissioncreatedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionCreatedInput | undefined): x is RolePermissioncreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isRolePermissionmodifiedByFactory(x: RolePermissionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutRolePermissionModifiedInput | undefined): x is RolePermissionmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type RolePermissionTraitKeys<TOptions extends RolePermissionFactoryDefineOptions> = keyof TOptions["traits"];

export interface RolePermissionFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RolePermission";
    build(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<Prisma.RolePermissionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<Prisma.RolePermissionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]): PromiseLike<Prisma.RolePermissionCreateInput[]>;
    pickForConnect(inputData: RolePermission): Pick<RolePermission, "id">;
    create(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<RolePermission>;
    createList(inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]): PromiseLike<RolePermission[]>;
    createForConnect(inputData?: Partial<Prisma.RolePermissionCreateInput>): PromiseLike<Pick<RolePermission, "id">>;
}

export interface RolePermissionFactoryInterface<TOptions extends RolePermissionFactoryDefineOptions = RolePermissionFactoryDefineOptions> extends RolePermissionFactoryInterfaceWithoutTraits {
    use(name: RolePermissionTraitKeys<TOptions>, ...names: readonly RolePermissionTraitKeys<TOptions>[]): RolePermissionFactoryInterfaceWithoutTraits;
}

function autoGenerateRolePermissionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RolePermissionScalarOrEnumFields {
    return {};
}

function defineRolePermissionFactoryInternal<TOptions extends RolePermissionFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RolePermissionFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RolePermissionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RolePermission", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RolePermissionCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRolePermissionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RolePermissionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RolePermissionFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                role: isRolePermissionroleFactory(defaultData.role) ? {
                    create: await defaultData.role.build()
                } : defaultData.role,
                permission: isRolePermissionpermissionFactory(defaultData.permission) ? {
                    create: await defaultData.permission.build()
                } : defaultData.permission,
                createdBy: isRolePermissioncreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isRolePermissionmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.RolePermissionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RolePermission) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RolePermissionCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().rolePermission.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RolePermissionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RolePermissionCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RolePermission" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RolePermissionTraitKeys<TOptions>, ...names: readonly RolePermissionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RolePermission} model.
 *
 * @param options
 * @returns factory {@link RolePermissionFactoryInterface}
 */
export function defineRolePermissionFactory<TOptions extends RolePermissionFactoryDefineOptions>(options: TOptions): RolePermissionFactoryInterface<TOptions> {
    return defineRolePermissionFactoryInternal(options);
}

type UserScalarOrEnumFields = {
    email: string;
};

type UserFactoryDefineInput = {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    email?: string;
    organisations?: Prisma.UserOrganisationCreateNestedManyWithoutUserInput;
    roles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    OrganisationCreated?: Prisma.OrganisationCreateNestedManyWithoutCreatedByInput;
    OrganisationModified?: Prisma.OrganisationCreateNestedManyWithoutModifiedByInput;
    PermissionCreated?: Prisma.PermissionCreateNestedManyWithoutCreatedByInput;
    PermissionModified?: Prisma.PermissionCreateNestedManyWithoutModifiedByInput;
    RoleCreated?: Prisma.RoleCreateNestedManyWithoutCreatedByInput;
    RoleModified?: Prisma.RoleCreateNestedManyWithoutModifiedByInput;
    RolePermissionCreated?: Prisma.RolePermissionCreateNestedManyWithoutCreatedByInput;
    RolePermissionModified?: Prisma.RolePermissionCreateNestedManyWithoutModifiedByInput;
    UserOrganisationCreated?: Prisma.UserOrganisationCreateNestedManyWithoutCreatedByInput;
    UserOrganisationModified?: Prisma.UserOrganisationCreateNestedManyWithoutModifiedByInput;
    UserRoleCreated?: Prisma.UserRoleCreateNestedManyWithoutCreatedByInput;
    UserRoleModified?: Prisma.UserRoleCreateNestedManyWithoutModifiedByInput;
    UserOrganisationRoleCreated?: Prisma.UserOrganisationRoleCreateNestedManyWithoutCreatedByInput;
    UserOrganisationRoleModified?: Prisma.UserOrganisationRoleCreateNestedManyWithoutModifiedByInput;
    TournamentCreated?: Prisma.TournamentCreateNestedManyWithoutCreatedByInput;
    TournamentModified?: Prisma.TournamentCreateNestedManyWithoutModifiedByInput;
    TeamQuestionCreated?: Prisma.TeamQuestionCreateNestedManyWithoutCreatedByInput;
    TeamQuestionModified?: Prisma.TeamQuestionCreateNestedManyWithoutModifiedByInput;
    BidCreated?: Prisma.BidCreateNestedManyWithoutCreatedByInput;
    BidModified?: Prisma.BidCreateNestedManyWithoutModifiedByInput;
    NotificationCreated?: Prisma.NotificationCreateNestedManyWithoutCreatedByInput;
    NotificationModified?: Prisma.NotificationCreateNestedManyWithoutModifiedByInput;
};

type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type UserTraitKeys<TOptions extends UserFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "id">>;
}

export interface UserFactoryInterface<TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions> extends UserFactoryInterfaceWithoutTraits {
    use(name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]): UserFactoryInterfaceWithoutTraits;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {
        email: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "email", isId: false, isUnique: true, seq })
    };
}

function defineUserFactoryInternal<TOptions extends UserFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("User", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: User) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().user.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory<TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<TOptions> {
    return defineUserFactoryInternal(options ?? {});
}

type UserOrganisationScalarOrEnumFields = {};

type UserOrganisationuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutOrganisationsInput["create"]>;
};

type UserOrganisationorganisationFactory = {
    _factoryFor: "Organisation";
    build: () => PromiseLike<Prisma.OrganisationCreateNestedOneWithoutUsersInput["create"]>;
};

type UserOrganisationcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationCreatedInput["create"]>;
};

type UserOrganisationmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationModifiedInput["create"]>;
};

type UserOrganisationFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    user: UserOrganisationuserFactory | Prisma.UserCreateNestedOneWithoutOrganisationsInput;
    organisation: UserOrganisationorganisationFactory | Prisma.OrganisationCreateNestedOneWithoutUsersInput;
    roles?: Prisma.UserOrganisationRoleCreateNestedManyWithoutUserOrganisationInput;
    createdBy?: UserOrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationCreatedInput;
    modifiedBy?: UserOrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationModifiedInput;
};

type UserOrganisationFactoryDefineOptions = {
    defaultData: Resolver<UserOrganisationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserOrganisationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isUserOrganisationuserFactory(x: UserOrganisationuserFactory | Prisma.UserCreateNestedOneWithoutOrganisationsInput | undefined): x is UserOrganisationuserFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserOrganisationorganisationFactory(x: UserOrganisationorganisationFactory | Prisma.OrganisationCreateNestedOneWithoutUsersInput | undefined): x is UserOrganisationorganisationFactory {
    return (x as any)?._factoryFor === "Organisation";
}

function isUserOrganisationcreatedByFactory(x: UserOrganisationcreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationCreatedInput | undefined): x is UserOrganisationcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserOrganisationmodifiedByFactory(x: UserOrganisationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationModifiedInput | undefined): x is UserOrganisationmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type UserOrganisationTraitKeys<TOptions extends UserOrganisationFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserOrganisationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "UserOrganisation";
    build(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<Prisma.UserOrganisationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<Prisma.UserOrganisationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]): PromiseLike<Prisma.UserOrganisationCreateInput[]>;
    pickForConnect(inputData: UserOrganisation): Pick<UserOrganisation, "id">;
    create(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<UserOrganisation>;
    createList(inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]): PromiseLike<UserOrganisation[]>;
    createForConnect(inputData?: Partial<Prisma.UserOrganisationCreateInput>): PromiseLike<Pick<UserOrganisation, "id">>;
}

export interface UserOrganisationFactoryInterface<TOptions extends UserOrganisationFactoryDefineOptions = UserOrganisationFactoryDefineOptions> extends UserOrganisationFactoryInterfaceWithoutTraits {
    use(name: UserOrganisationTraitKeys<TOptions>, ...names: readonly UserOrganisationTraitKeys<TOptions>[]): UserOrganisationFactoryInterfaceWithoutTraits;
}

function autoGenerateUserOrganisationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserOrganisationScalarOrEnumFields {
    return {};
}

function defineUserOrganisationFactoryInternal<TOptions extends UserOrganisationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserOrganisationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserOrganisationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("UserOrganisation", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserOrganisationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserOrganisationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserOrganisationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserOrganisationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                user: isUserOrganisationuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user,
                organisation: isUserOrganisationorganisationFactory(defaultData.organisation) ? {
                    create: await defaultData.organisation.build()
                } : defaultData.organisation,
                createdBy: isUserOrganisationcreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isUserOrganisationmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.UserOrganisationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: UserOrganisation) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserOrganisationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().userOrganisation.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserOrganisationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserOrganisationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "UserOrganisation" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserOrganisationTraitKeys<TOptions>, ...names: readonly UserOrganisationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link UserOrganisation} model.
 *
 * @param options
 * @returns factory {@link UserOrganisationFactoryInterface}
 */
export function defineUserOrganisationFactory<TOptions extends UserOrganisationFactoryDefineOptions>(options: TOptions): UserOrganisationFactoryInterface<TOptions> {
    return defineUserOrganisationFactoryInternal(options);
}

type UserOrganisationRoleScalarOrEnumFields = {};

type UserOrganisationRoleuserOrganisationFactory = {
    _factoryFor: "UserOrganisation";
    build: () => PromiseLike<Prisma.UserOrganisationCreateNestedOneWithoutRolesInput["create"]>;
};

type UserOrganisationRoleroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutUserOrganisationsInput["create"]>;
};

type UserOrganisationRolecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationRoleCreatedInput["create"]>;
};

type UserOrganisationRolemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserOrganisationRoleModifiedInput["create"]>;
};

type UserOrganisationRoleFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    userOrganisation: UserOrganisationRoleuserOrganisationFactory | Prisma.UserOrganisationCreateNestedOneWithoutRolesInput;
    role: UserOrganisationRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUserOrganisationsInput;
    createdBy?: UserOrganisationRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleCreatedInput;
    modifiedBy?: UserOrganisationRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleModifiedInput;
};

type UserOrganisationRoleFactoryDefineOptions = {
    defaultData: Resolver<UserOrganisationRoleFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserOrganisationRoleFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isUserOrganisationRoleuserOrganisationFactory(x: UserOrganisationRoleuserOrganisationFactory | Prisma.UserOrganisationCreateNestedOneWithoutRolesInput | undefined): x is UserOrganisationRoleuserOrganisationFactory {
    return (x as any)?._factoryFor === "UserOrganisation";
}

function isUserOrganisationRoleroleFactory(x: UserOrganisationRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUserOrganisationsInput | undefined): x is UserOrganisationRoleroleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isUserOrganisationRolecreatedByFactory(x: UserOrganisationRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleCreatedInput | undefined): x is UserOrganisationRolecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserOrganisationRolemodifiedByFactory(x: UserOrganisationRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserOrganisationRoleModifiedInput | undefined): x is UserOrganisationRolemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type UserOrganisationRoleTraitKeys<TOptions extends UserOrganisationRoleFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserOrganisationRoleFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "UserOrganisationRole";
    build(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<Prisma.UserOrganisationRoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<Prisma.UserOrganisationRoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]): PromiseLike<Prisma.UserOrganisationRoleCreateInput[]>;
    pickForConnect(inputData: UserOrganisationRole): Pick<UserOrganisationRole, "id">;
    create(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<UserOrganisationRole>;
    createList(inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]): PromiseLike<UserOrganisationRole[]>;
    createForConnect(inputData?: Partial<Prisma.UserOrganisationRoleCreateInput>): PromiseLike<Pick<UserOrganisationRole, "id">>;
}

export interface UserOrganisationRoleFactoryInterface<TOptions extends UserOrganisationRoleFactoryDefineOptions = UserOrganisationRoleFactoryDefineOptions> extends UserOrganisationRoleFactoryInterfaceWithoutTraits {
    use(name: UserOrganisationRoleTraitKeys<TOptions>, ...names: readonly UserOrganisationRoleTraitKeys<TOptions>[]): UserOrganisationRoleFactoryInterfaceWithoutTraits;
}

function autoGenerateUserOrganisationRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserOrganisationRoleScalarOrEnumFields {
    return {};
}

function defineUserOrganisationRoleFactoryInternal<TOptions extends UserOrganisationRoleFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserOrganisationRoleFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserOrganisationRoleTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("UserOrganisationRole", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserOrganisationRoleCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserOrganisationRoleScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserOrganisationRoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserOrganisationRoleFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                userOrganisation: isUserOrganisationRoleuserOrganisationFactory(defaultData.userOrganisation) ? {
                    create: await defaultData.userOrganisation.build()
                } : defaultData.userOrganisation,
                role: isUserOrganisationRoleroleFactory(defaultData.role) ? {
                    create: await defaultData.role.build()
                } : defaultData.role,
                createdBy: isUserOrganisationRolecreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isUserOrganisationRolemodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.UserOrganisationRoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: UserOrganisationRole) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserOrganisationRoleCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().userOrganisationRole.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserOrganisationRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserOrganisationRoleCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "UserOrganisationRole" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserOrganisationRoleTraitKeys<TOptions>, ...names: readonly UserOrganisationRoleTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link UserOrganisationRole} model.
 *
 * @param options
 * @returns factory {@link UserOrganisationRoleFactoryInterface}
 */
export function defineUserOrganisationRoleFactory<TOptions extends UserOrganisationRoleFactoryDefineOptions>(options: TOptions): UserOrganisationRoleFactoryInterface<TOptions> {
    return defineUserOrganisationRoleFactoryInternal(options);
}

type UserRoleScalarOrEnumFields = {};

type UserRoleuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRolesInput["create"]>;
};

type UserRoleroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutUsersInput["create"]>;
};

type UserRolecreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserRoleCreatedInput["create"]>;
};

type UserRolemodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserRoleModifiedInput["create"]>;
};

type UserRoleFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    user: UserRoleuserFactory | Prisma.UserCreateNestedOneWithoutRolesInput;
    role: UserRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUsersInput;
    createdBy?: UserRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleCreatedInput;
    modifiedBy?: UserRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleModifiedInput;
};

type UserRoleFactoryDefineOptions = {
    defaultData: Resolver<UserRoleFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserRoleFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isUserRoleuserFactory(x: UserRoleuserFactory | Prisma.UserCreateNestedOneWithoutRolesInput | undefined): x is UserRoleuserFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserRoleroleFactory(x: UserRoleroleFactory | Prisma.RoleCreateNestedOneWithoutUsersInput | undefined): x is UserRoleroleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isUserRolecreatedByFactory(x: UserRolecreatedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleCreatedInput | undefined): x is UserRolecreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isUserRolemodifiedByFactory(x: UserRolemodifiedByFactory | Prisma.UserCreateNestedOneWithoutUserRoleModifiedInput | undefined): x is UserRolemodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type UserRoleTraitKeys<TOptions extends UserRoleFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserRoleFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "UserRole";
    build(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<Prisma.UserRoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<Prisma.UserRoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]): PromiseLike<Prisma.UserRoleCreateInput[]>;
    pickForConnect(inputData: UserRole): Pick<UserRole, "id">;
    create(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<UserRole>;
    createList(inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]): PromiseLike<UserRole[]>;
    createForConnect(inputData?: Partial<Prisma.UserRoleCreateInput>): PromiseLike<Pick<UserRole, "id">>;
}

export interface UserRoleFactoryInterface<TOptions extends UserRoleFactoryDefineOptions = UserRoleFactoryDefineOptions> extends UserRoleFactoryInterfaceWithoutTraits {
    use(name: UserRoleTraitKeys<TOptions>, ...names: readonly UserRoleTraitKeys<TOptions>[]): UserRoleFactoryInterfaceWithoutTraits;
}

function autoGenerateUserRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserRoleScalarOrEnumFields {
    return {};
}

function defineUserRoleFactoryInternal<TOptions extends UserRoleFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserRoleFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserRoleTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("UserRole", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserRoleCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserRoleScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserRoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserRoleFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                user: isUserRoleuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user,
                role: isUserRoleroleFactory(defaultData.role) ? {
                    create: await defaultData.role.build()
                } : defaultData.role,
                createdBy: isUserRolecreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isUserRolemodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.UserRoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: UserRole) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserRoleCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().userRole.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserRoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserRoleCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "UserRole" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserRoleTraitKeys<TOptions>, ...names: readonly UserRoleTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link UserRole} model.
 *
 * @param options
 * @returns factory {@link UserRoleFactoryInterface}
 */
export function defineUserRoleFactory<TOptions extends UserRoleFactoryDefineOptions>(options: TOptions): UserRoleFactoryInterface<TOptions> {
    return defineUserRoleFactoryInternal(options);
}

type AccountsSheetScalarOrEnumFields = {
    year: number;
};

type AccountsSheetteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutAccountsSheetInput["create"]>;
};

type AccountsSheetFactoryDefineInput = {
    id?: string;
    year?: number;
    netIncome?: boolean | null;
    equity?: boolean | null;
    cash?: boolean | null;
    accountingInputs?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    team: AccountsSheetteamFactory | Prisma.TeamCreateNestedOneWithoutAccountsSheetInput;
};

type AccountsSheetFactoryDefineOptions = {
    defaultData: Resolver<AccountsSheetFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<AccountsSheetFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isAccountsSheetteamFactory(x: AccountsSheetteamFactory | Prisma.TeamCreateNestedOneWithoutAccountsSheetInput | undefined): x is AccountsSheetteamFactory {
    return (x as any)?._factoryFor === "Team";
}

type AccountsSheetTraitKeys<TOptions extends AccountsSheetFactoryDefineOptions> = keyof TOptions["traits"];

export interface AccountsSheetFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "AccountsSheet";
    build(inputData?: Partial<Prisma.AccountsSheetCreateInput>): PromiseLike<Prisma.AccountsSheetCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AccountsSheetCreateInput>): PromiseLike<Prisma.AccountsSheetCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.AccountsSheetCreateInput>[]): PromiseLike<Prisma.AccountsSheetCreateInput[]>;
    pickForConnect(inputData: AccountsSheet): Pick<AccountsSheet, "id">;
    create(inputData?: Partial<Prisma.AccountsSheetCreateInput>): PromiseLike<AccountsSheet>;
    createList(inputData: number | readonly Partial<Prisma.AccountsSheetCreateInput>[]): PromiseLike<AccountsSheet[]>;
    createForConnect(inputData?: Partial<Prisma.AccountsSheetCreateInput>): PromiseLike<Pick<AccountsSheet, "id">>;
}

export interface AccountsSheetFactoryInterface<TOptions extends AccountsSheetFactoryDefineOptions = AccountsSheetFactoryDefineOptions> extends AccountsSheetFactoryInterfaceWithoutTraits {
    use(name: AccountsSheetTraitKeys<TOptions>, ...names: readonly AccountsSheetTraitKeys<TOptions>[]): AccountsSheetFactoryInterfaceWithoutTraits;
}

function autoGenerateAccountsSheetScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AccountsSheetScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "AccountsSheet", fieldName: "year", isId: false, isUnique: false, seq })
    };
}

function defineAccountsSheetFactoryInternal<TOptions extends AccountsSheetFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): AccountsSheetFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly AccountsSheetTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("AccountsSheet", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.AccountsSheetCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAccountsSheetScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AccountsSheetFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AccountsSheetFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                team: isAccountsSheetteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team
            };
            const data: Prisma.AccountsSheetCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.AccountsSheetCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: AccountsSheet) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AccountsSheetCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().accountsSheet.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.AccountsSheetCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AccountsSheetCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "AccountsSheet" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AccountsSheetTraitKeys<TOptions>, ...names: readonly AccountsSheetTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link AccountsSheet} model.
 *
 * @param options
 * @returns factory {@link AccountsSheetFactoryInterface}
 */
export function defineAccountsSheetFactory<TOptions extends AccountsSheetFactoryDefineOptions>(options: TOptions): AccountsSheetFactoryInterface<TOptions> {
    return defineAccountsSheetFactoryInternal(options);
}

type AnswerScalarOrEnumFields = {
    answer: string;
};

type AnswerquestionFactory = {
    _factoryFor: "Question";
    build: () => PromiseLike<Prisma.QuestionCreateNestedOneWithoutAnswerInput["create"]>;
};

type AnswercorrectQuestionFactory = {
    _factoryFor: "Question";
    build: () => PromiseLike<Prisma.QuestionCreateNestedOneWithoutCorrectAnswerInput["create"]>;
};

type AnswerFactoryDefineInput = {
    id?: string;
    answer?: string;
    question: AnswerquestionFactory | Prisma.QuestionCreateNestedOneWithoutAnswerInput;
    correctQuestion?: AnswercorrectQuestionFactory | Prisma.QuestionCreateNestedOneWithoutCorrectAnswerInput;
    teamQuestion?: Prisma.TeamQuestionCreateNestedManyWithoutSelectedAnswerInput;
};

type AnswerFactoryDefineOptions = {
    defaultData: Resolver<AnswerFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<AnswerFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isAnswerquestionFactory(x: AnswerquestionFactory | Prisma.QuestionCreateNestedOneWithoutAnswerInput | undefined): x is AnswerquestionFactory {
    return (x as any)?._factoryFor === "Question";
}

function isAnswercorrectQuestionFactory(x: AnswercorrectQuestionFactory | Prisma.QuestionCreateNestedOneWithoutCorrectAnswerInput | undefined): x is AnswercorrectQuestionFactory {
    return (x as any)?._factoryFor === "Question";
}

type AnswerTraitKeys<TOptions extends AnswerFactoryDefineOptions> = keyof TOptions["traits"];

export interface AnswerFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Answer";
    build(inputData?: Partial<Prisma.AnswerCreateInput>): PromiseLike<Prisma.AnswerCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AnswerCreateInput>): PromiseLike<Prisma.AnswerCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.AnswerCreateInput>[]): PromiseLike<Prisma.AnswerCreateInput[]>;
    pickForConnect(inputData: Answer): Pick<Answer, "id">;
    create(inputData?: Partial<Prisma.AnswerCreateInput>): PromiseLike<Answer>;
    createList(inputData: number | readonly Partial<Prisma.AnswerCreateInput>[]): PromiseLike<Answer[]>;
    createForConnect(inputData?: Partial<Prisma.AnswerCreateInput>): PromiseLike<Pick<Answer, "id">>;
}

export interface AnswerFactoryInterface<TOptions extends AnswerFactoryDefineOptions = AnswerFactoryDefineOptions> extends AnswerFactoryInterfaceWithoutTraits {
    use(name: AnswerTraitKeys<TOptions>, ...names: readonly AnswerTraitKeys<TOptions>[]): AnswerFactoryInterfaceWithoutTraits;
}

function autoGenerateAnswerScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AnswerScalarOrEnumFields {
    return {
        answer: getScalarFieldValueGenerator().String({ modelName: "Answer", fieldName: "answer", isId: false, isUnique: false, seq })
    };
}

function defineAnswerFactoryInternal<TOptions extends AnswerFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): AnswerFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly AnswerTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Answer", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.AnswerCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAnswerScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AnswerFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AnswerFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                question: isAnswerquestionFactory(defaultData.question) ? {
                    create: await defaultData.question.build()
                } : defaultData.question,
                correctQuestion: isAnswercorrectQuestionFactory(defaultData.correctQuestion) ? {
                    create: await defaultData.correctQuestion.build()
                } : defaultData.correctQuestion
            };
            const data: Prisma.AnswerCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.AnswerCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Answer) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AnswerCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().answer.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.AnswerCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AnswerCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Answer" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AnswerTraitKeys<TOptions>, ...names: readonly AnswerTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Answer} model.
 *
 * @param options
 * @returns factory {@link AnswerFactoryInterface}
 */
export function defineAnswerFactory<TOptions extends AnswerFactoryDefineOptions>(options: TOptions): AnswerFactoryInterface<TOptions> {
    return defineAnswerFactoryInternal(options);
}

type AuctionScalarOrEnumFields = {
    year: number;
    lot: number;
    active: boolean;
};

type AuctioncompanyFactory = {
    _factoryFor: "Company";
    build: () => PromiseLike<Prisma.CompanyCreateNestedOneWithoutAuctionInput["create"]>;
};

type AuctiongameFactory = {
    _factoryFor: "Game";
    build: () => PromiseLike<Prisma.GameCreateNestedOneWithoutAuctionInput["create"]>;
};

type AuctionFactoryDefineInput = {
    id?: string;
    year?: number;
    lot?: number;
    active?: boolean;
    sold?: boolean;
    auctionStartTime?: Date | null;
    auctionEndTime?: Date | null;
    company: AuctioncompanyFactory | Prisma.CompanyCreateNestedOneWithoutAuctionInput;
    game: AuctiongameFactory | Prisma.GameCreateNestedOneWithoutAuctionInput;
    bid?: Prisma.BidCreateNestedManyWithoutAuctionInput;
};

type AuctionFactoryDefineOptions = {
    defaultData: Resolver<AuctionFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<AuctionFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isAuctioncompanyFactory(x: AuctioncompanyFactory | Prisma.CompanyCreateNestedOneWithoutAuctionInput | undefined): x is AuctioncompanyFactory {
    return (x as any)?._factoryFor === "Company";
}

function isAuctiongameFactory(x: AuctiongameFactory | Prisma.GameCreateNestedOneWithoutAuctionInput | undefined): x is AuctiongameFactory {
    return (x as any)?._factoryFor === "Game";
}

type AuctionTraitKeys<TOptions extends AuctionFactoryDefineOptions> = keyof TOptions["traits"];

export interface AuctionFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Auction";
    build(inputData?: Partial<Prisma.AuctionCreateInput>): PromiseLike<Prisma.AuctionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AuctionCreateInput>): PromiseLike<Prisma.AuctionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.AuctionCreateInput>[]): PromiseLike<Prisma.AuctionCreateInput[]>;
    pickForConnect(inputData: Auction): Pick<Auction, "id">;
    create(inputData?: Partial<Prisma.AuctionCreateInput>): PromiseLike<Auction>;
    createList(inputData: number | readonly Partial<Prisma.AuctionCreateInput>[]): PromiseLike<Auction[]>;
    createForConnect(inputData?: Partial<Prisma.AuctionCreateInput>): PromiseLike<Pick<Auction, "id">>;
}

export interface AuctionFactoryInterface<TOptions extends AuctionFactoryDefineOptions = AuctionFactoryDefineOptions> extends AuctionFactoryInterfaceWithoutTraits {
    use(name: AuctionTraitKeys<TOptions>, ...names: readonly AuctionTraitKeys<TOptions>[]): AuctionFactoryInterfaceWithoutTraits;
}

function autoGenerateAuctionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AuctionScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "Auction", fieldName: "year", isId: false, isUnique: false, seq }),
        lot: getScalarFieldValueGenerator().Int({ modelName: "Auction", fieldName: "lot", isId: false, isUnique: false, seq }),
        active: getScalarFieldValueGenerator().Boolean({ modelName: "Auction", fieldName: "active", isId: false, isUnique: false, seq })
    };
}

function defineAuctionFactoryInternal<TOptions extends AuctionFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): AuctionFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly AuctionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Auction", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.AuctionCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAuctionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AuctionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AuctionFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                company: isAuctioncompanyFactory(defaultData.company) ? {
                    create: await defaultData.company.build()
                } : defaultData.company,
                game: isAuctiongameFactory(defaultData.game) ? {
                    create: await defaultData.game.build()
                } : defaultData.game
            };
            const data: Prisma.AuctionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.AuctionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Auction) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AuctionCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().auction.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.AuctionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AuctionCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Auction" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AuctionTraitKeys<TOptions>, ...names: readonly AuctionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Auction} model.
 *
 * @param options
 * @returns factory {@link AuctionFactoryInterface}
 */
export function defineAuctionFactory<TOptions extends AuctionFactoryDefineOptions>(options: TOptions): AuctionFactoryInterface<TOptions> {
    return defineAuctionFactoryInternal(options);
}

type BalanceSheetScalarOrEnumFields = {
    year: number;
    cash: number;
    equity: number;
    debt: number;
};

type BalanceSheetteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutBalanceSheetInput["create"]>;
};

type BalanceSheetFactoryDefineInput = {
    id?: string;
    year?: number;
    cash?: number;
    equity?: number;
    debt?: number;
    roundFund?: number | null;
    quizFund?: number | null;
    financingFund?: number | null;
    localEventFund?: number | null;
    globalEventFund?: number | null;
    auctionSpendings?: number | null;
    maxDebtFine?: number | null;
    team: BalanceSheetteamFactory | Prisma.TeamCreateNestedOneWithoutBalanceSheetInput;
};

type BalanceSheetFactoryDefineOptions = {
    defaultData: Resolver<BalanceSheetFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<BalanceSheetFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isBalanceSheetteamFactory(x: BalanceSheetteamFactory | Prisma.TeamCreateNestedOneWithoutBalanceSheetInput | undefined): x is BalanceSheetteamFactory {
    return (x as any)?._factoryFor === "Team";
}

type BalanceSheetTraitKeys<TOptions extends BalanceSheetFactoryDefineOptions> = keyof TOptions["traits"];

export interface BalanceSheetFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "BalanceSheet";
    build(inputData?: Partial<Prisma.BalanceSheetCreateInput>): PromiseLike<Prisma.BalanceSheetCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.BalanceSheetCreateInput>): PromiseLike<Prisma.BalanceSheetCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.BalanceSheetCreateInput>[]): PromiseLike<Prisma.BalanceSheetCreateInput[]>;
    pickForConnect(inputData: BalanceSheet): Pick<BalanceSheet, "id">;
    create(inputData?: Partial<Prisma.BalanceSheetCreateInput>): PromiseLike<BalanceSheet>;
    createList(inputData: number | readonly Partial<Prisma.BalanceSheetCreateInput>[]): PromiseLike<BalanceSheet[]>;
    createForConnect(inputData?: Partial<Prisma.BalanceSheetCreateInput>): PromiseLike<Pick<BalanceSheet, "id">>;
}

export interface BalanceSheetFactoryInterface<TOptions extends BalanceSheetFactoryDefineOptions = BalanceSheetFactoryDefineOptions> extends BalanceSheetFactoryInterfaceWithoutTraits {
    use(name: BalanceSheetTraitKeys<TOptions>, ...names: readonly BalanceSheetTraitKeys<TOptions>[]): BalanceSheetFactoryInterfaceWithoutTraits;
}

function autoGenerateBalanceSheetScalarsOrEnums({ seq }: {
    readonly seq: number;
}): BalanceSheetScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "BalanceSheet", fieldName: "year", isId: false, isUnique: false, seq }),
        cash: getScalarFieldValueGenerator().Int({ modelName: "BalanceSheet", fieldName: "cash", isId: false, isUnique: false, seq }),
        equity: getScalarFieldValueGenerator().Int({ modelName: "BalanceSheet", fieldName: "equity", isId: false, isUnique: false, seq }),
        debt: getScalarFieldValueGenerator().Int({ modelName: "BalanceSheet", fieldName: "debt", isId: false, isUnique: false, seq })
    };
}

function defineBalanceSheetFactoryInternal<TOptions extends BalanceSheetFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): BalanceSheetFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly BalanceSheetTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("BalanceSheet", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.BalanceSheetCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateBalanceSheetScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<BalanceSheetFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<BalanceSheetFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                team: isBalanceSheetteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team
            };
            const data: Prisma.BalanceSheetCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.BalanceSheetCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: BalanceSheet) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.BalanceSheetCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().balanceSheet.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.BalanceSheetCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.BalanceSheetCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "BalanceSheet" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: BalanceSheetTraitKeys<TOptions>, ...names: readonly BalanceSheetTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link BalanceSheet} model.
 *
 * @param options
 * @returns factory {@link BalanceSheetFactoryInterface}
 */
export function defineBalanceSheetFactory<TOptions extends BalanceSheetFactoryDefineOptions>(options: TOptions): BalanceSheetFactoryInterface<TOptions> {
    return defineBalanceSheetFactoryInternal(options);
}

type BidScalarOrEnumFields = {
    amount: number;
};

type BidauctionFactory = {
    _factoryFor: "Auction";
    build: () => PromiseLike<Prisma.AuctionCreateNestedOneWithoutBidInput["create"]>;
};

type BidcompanyFactory = {
    _factoryFor: "Company";
    build: () => PromiseLike<Prisma.CompanyCreateNestedOneWithoutBidInput["create"]>;
};

type BidgameFactory = {
    _factoryFor: "Game";
    build: () => PromiseLike<Prisma.GameCreateNestedOneWithoutBidInput["create"]>;
};

type BidteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutBidInput["create"]>;
};

type BidcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutBidCreatedInput["create"]>;
};

type BidmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutBidModifiedInput["create"]>;
};

type BidFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    amount?: number;
    auction: BidauctionFactory | Prisma.AuctionCreateNestedOneWithoutBidInput;
    company: BidcompanyFactory | Prisma.CompanyCreateNestedOneWithoutBidInput;
    game: BidgameFactory | Prisma.GameCreateNestedOneWithoutBidInput;
    team: BidteamFactory | Prisma.TeamCreateNestedOneWithoutBidInput;
    createdBy?: BidcreatedByFactory | Prisma.UserCreateNestedOneWithoutBidCreatedInput;
    modifiedBy?: BidmodifiedByFactory | Prisma.UserCreateNestedOneWithoutBidModifiedInput;
};

type BidFactoryDefineOptions = {
    defaultData: Resolver<BidFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<BidFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isBidauctionFactory(x: BidauctionFactory | Prisma.AuctionCreateNestedOneWithoutBidInput | undefined): x is BidauctionFactory {
    return (x as any)?._factoryFor === "Auction";
}

function isBidcompanyFactory(x: BidcompanyFactory | Prisma.CompanyCreateNestedOneWithoutBidInput | undefined): x is BidcompanyFactory {
    return (x as any)?._factoryFor === "Company";
}

function isBidgameFactory(x: BidgameFactory | Prisma.GameCreateNestedOneWithoutBidInput | undefined): x is BidgameFactory {
    return (x as any)?._factoryFor === "Game";
}

function isBidteamFactory(x: BidteamFactory | Prisma.TeamCreateNestedOneWithoutBidInput | undefined): x is BidteamFactory {
    return (x as any)?._factoryFor === "Team";
}

function isBidcreatedByFactory(x: BidcreatedByFactory | Prisma.UserCreateNestedOneWithoutBidCreatedInput | undefined): x is BidcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isBidmodifiedByFactory(x: BidmodifiedByFactory | Prisma.UserCreateNestedOneWithoutBidModifiedInput | undefined): x is BidmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type BidTraitKeys<TOptions extends BidFactoryDefineOptions> = keyof TOptions["traits"];

export interface BidFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Bid";
    build(inputData?: Partial<Prisma.BidCreateInput>): PromiseLike<Prisma.BidCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.BidCreateInput>): PromiseLike<Prisma.BidCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.BidCreateInput>[]): PromiseLike<Prisma.BidCreateInput[]>;
    pickForConnect(inputData: Bid): Pick<Bid, "id">;
    create(inputData?: Partial<Prisma.BidCreateInput>): PromiseLike<Bid>;
    createList(inputData: number | readonly Partial<Prisma.BidCreateInput>[]): PromiseLike<Bid[]>;
    createForConnect(inputData?: Partial<Prisma.BidCreateInput>): PromiseLike<Pick<Bid, "id">>;
}

export interface BidFactoryInterface<TOptions extends BidFactoryDefineOptions = BidFactoryDefineOptions> extends BidFactoryInterfaceWithoutTraits {
    use(name: BidTraitKeys<TOptions>, ...names: readonly BidTraitKeys<TOptions>[]): BidFactoryInterfaceWithoutTraits;
}

function autoGenerateBidScalarsOrEnums({ seq }: {
    readonly seq: number;
}): BidScalarOrEnumFields {
    return {
        amount: getScalarFieldValueGenerator().Int({ modelName: "Bid", fieldName: "amount", isId: false, isUnique: false, seq })
    };
}

function defineBidFactoryInternal<TOptions extends BidFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): BidFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly BidTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Bid", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.BidCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateBidScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<BidFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<BidFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                auction: isBidauctionFactory(defaultData.auction) ? {
                    create: await defaultData.auction.build()
                } : defaultData.auction,
                company: isBidcompanyFactory(defaultData.company) ? {
                    create: await defaultData.company.build()
                } : defaultData.company,
                game: isBidgameFactory(defaultData.game) ? {
                    create: await defaultData.game.build()
                } : defaultData.game,
                team: isBidteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team,
                createdBy: isBidcreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isBidmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.BidCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.BidCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Bid) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.BidCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().bid.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.BidCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.BidCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Bid" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: BidTraitKeys<TOptions>, ...names: readonly BidTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Bid} model.
 *
 * @param options
 * @returns factory {@link BidFactoryInterface}
 */
export function defineBidFactory<TOptions extends BidFactoryDefineOptions>(options: TOptions): BidFactoryInterface<TOptions> {
    return defineBidFactoryInternal(options);
}

type CompanyScalarOrEnumFields = {
    name: string;
    reserve: number;
    risk: number;
    year: number;
    salePrice: number;
};

type CompanysectorFactory = {
    _factoryFor: "Sector";
    build: () => PromiseLike<Prisma.SectorCreateNestedOneWithoutCompanyInput["create"]>;
};

type CompanyFactoryDefineInput = {
    id?: string;
    name?: string;
    reserve?: number;
    risk?: number;
    year?: number;
    salePrice?: number;
    auction?: Prisma.AuctionCreateNestedManyWithoutCompanyInput;
    bid?: Prisma.BidCreateNestedManyWithoutCompanyInput;
    sector: CompanysectorFactory | Prisma.SectorCreateNestedOneWithoutCompanyInput;
    earnings?: Prisma.EarningsCreateNestedManyWithoutCompanyInput;
    teamCompany?: Prisma.TeamCompanyCreateNestedManyWithoutCompanyInput;
};

type CompanyFactoryDefineOptions = {
    defaultData: Resolver<CompanyFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<CompanyFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isCompanysectorFactory(x: CompanysectorFactory | Prisma.SectorCreateNestedOneWithoutCompanyInput | undefined): x is CompanysectorFactory {
    return (x as any)?._factoryFor === "Sector";
}

type CompanyTraitKeys<TOptions extends CompanyFactoryDefineOptions> = keyof TOptions["traits"];

export interface CompanyFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Company";
    build(inputData?: Partial<Prisma.CompanyCreateInput>): PromiseLike<Prisma.CompanyCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.CompanyCreateInput>): PromiseLike<Prisma.CompanyCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.CompanyCreateInput>[]): PromiseLike<Prisma.CompanyCreateInput[]>;
    pickForConnect(inputData: Company): Pick<Company, "id">;
    create(inputData?: Partial<Prisma.CompanyCreateInput>): PromiseLike<Company>;
    createList(inputData: number | readonly Partial<Prisma.CompanyCreateInput>[]): PromiseLike<Company[]>;
    createForConnect(inputData?: Partial<Prisma.CompanyCreateInput>): PromiseLike<Pick<Company, "id">>;
}

export interface CompanyFactoryInterface<TOptions extends CompanyFactoryDefineOptions = CompanyFactoryDefineOptions> extends CompanyFactoryInterfaceWithoutTraits {
    use(name: CompanyTraitKeys<TOptions>, ...names: readonly CompanyTraitKeys<TOptions>[]): CompanyFactoryInterfaceWithoutTraits;
}

function autoGenerateCompanyScalarsOrEnums({ seq }: {
    readonly seq: number;
}): CompanyScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Company", fieldName: "name", isId: false, isUnique: false, seq }),
        reserve: getScalarFieldValueGenerator().Int({ modelName: "Company", fieldName: "reserve", isId: false, isUnique: false, seq }),
        risk: getScalarFieldValueGenerator().Int({ modelName: "Company", fieldName: "risk", isId: false, isUnique: false, seq }),
        year: getScalarFieldValueGenerator().Int({ modelName: "Company", fieldName: "year", isId: false, isUnique: false, seq }),
        salePrice: getScalarFieldValueGenerator().Int({ modelName: "Company", fieldName: "salePrice", isId: false, isUnique: false, seq })
    };
}

function defineCompanyFactoryInternal<TOptions extends CompanyFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): CompanyFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly CompanyTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Company", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.CompanyCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateCompanyScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<CompanyFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<CompanyFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                sector: isCompanysectorFactory(defaultData.sector) ? {
                    create: await defaultData.sector.build()
                } : defaultData.sector
            };
            const data: Prisma.CompanyCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.CompanyCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Company) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.CompanyCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().company.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.CompanyCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.CompanyCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Company" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: CompanyTraitKeys<TOptions>, ...names: readonly CompanyTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Company} model.
 *
 * @param options
 * @returns factory {@link CompanyFactoryInterface}
 */
export function defineCompanyFactory<TOptions extends CompanyFactoryDefineOptions>(options: TOptions): CompanyFactoryInterface<TOptions> {
    return defineCompanyFactoryInternal(options);
}

type EarningsScalarOrEnumFields = {
    year: number;
    amount: number;
};

type EarningscompanyFactory = {
    _factoryFor: "Company";
    build: () => PromiseLike<Prisma.CompanyCreateNestedOneWithoutEarningsInput["create"]>;
};

type EarningsFactoryDefineInput = {
    id?: string;
    year?: number;
    amount?: number;
    company: EarningscompanyFactory | Prisma.CompanyCreateNestedOneWithoutEarningsInput;
};

type EarningsFactoryDefineOptions = {
    defaultData: Resolver<EarningsFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<EarningsFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isEarningscompanyFactory(x: EarningscompanyFactory | Prisma.CompanyCreateNestedOneWithoutEarningsInput | undefined): x is EarningscompanyFactory {
    return (x as any)?._factoryFor === "Company";
}

type EarningsTraitKeys<TOptions extends EarningsFactoryDefineOptions> = keyof TOptions["traits"];

export interface EarningsFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Earnings";
    build(inputData?: Partial<Prisma.EarningsCreateInput>): PromiseLike<Prisma.EarningsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.EarningsCreateInput>): PromiseLike<Prisma.EarningsCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.EarningsCreateInput>[]): PromiseLike<Prisma.EarningsCreateInput[]>;
    pickForConnect(inputData: Earnings): Pick<Earnings, "id">;
    create(inputData?: Partial<Prisma.EarningsCreateInput>): PromiseLike<Earnings>;
    createList(inputData: number | readonly Partial<Prisma.EarningsCreateInput>[]): PromiseLike<Earnings[]>;
    createForConnect(inputData?: Partial<Prisma.EarningsCreateInput>): PromiseLike<Pick<Earnings, "id">>;
}

export interface EarningsFactoryInterface<TOptions extends EarningsFactoryDefineOptions = EarningsFactoryDefineOptions> extends EarningsFactoryInterfaceWithoutTraits {
    use(name: EarningsTraitKeys<TOptions>, ...names: readonly EarningsTraitKeys<TOptions>[]): EarningsFactoryInterfaceWithoutTraits;
}

function autoGenerateEarningsScalarsOrEnums({ seq }: {
    readonly seq: number;
}): EarningsScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "Earnings", fieldName: "year", isId: false, isUnique: false, seq }),
        amount: getScalarFieldValueGenerator().Int({ modelName: "Earnings", fieldName: "amount", isId: false, isUnique: false, seq })
    };
}

function defineEarningsFactoryInternal<TOptions extends EarningsFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): EarningsFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly EarningsTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Earnings", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.EarningsCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateEarningsScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<EarningsFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<EarningsFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                company: isEarningscompanyFactory(defaultData.company) ? {
                    create: await defaultData.company.build()
                } : defaultData.company
            };
            const data: Prisma.EarningsCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.EarningsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Earnings) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.EarningsCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().earnings.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.EarningsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.EarningsCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Earnings" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: EarningsTraitKeys<TOptions>, ...names: readonly EarningsTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Earnings} model.
 *
 * @param options
 * @returns factory {@link EarningsFactoryInterface}
 */
export function defineEarningsFactory<TOptions extends EarningsFactoryDefineOptions>(options: TOptions): EarningsFactoryInterface<TOptions> {
    return defineEarningsFactoryInternal(options);
}

type FinanceScalarOrEnumFields = {
    year: number;
};

type FinanceteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutFinanceInput["create"]>;
};

type FinanceFactoryDefineInput = {
    id?: string;
    year?: number;
    amountDebtPaid?: number | null;
    amountIncomeSale?: number | null;
    amountBorrowed?: number | null;
    team: FinanceteamFactory | Prisma.TeamCreateNestedOneWithoutFinanceInput;
};

type FinanceFactoryDefineOptions = {
    defaultData: Resolver<FinanceFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<FinanceFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isFinanceteamFactory(x: FinanceteamFactory | Prisma.TeamCreateNestedOneWithoutFinanceInput | undefined): x is FinanceteamFactory {
    return (x as any)?._factoryFor === "Team";
}

type FinanceTraitKeys<TOptions extends FinanceFactoryDefineOptions> = keyof TOptions["traits"];

export interface FinanceFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Finance";
    build(inputData?: Partial<Prisma.FinanceCreateInput>): PromiseLike<Prisma.FinanceCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.FinanceCreateInput>): PromiseLike<Prisma.FinanceCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.FinanceCreateInput>[]): PromiseLike<Prisma.FinanceCreateInput[]>;
    pickForConnect(inputData: Finance): Pick<Finance, "id">;
    create(inputData?: Partial<Prisma.FinanceCreateInput>): PromiseLike<Finance>;
    createList(inputData: number | readonly Partial<Prisma.FinanceCreateInput>[]): PromiseLike<Finance[]>;
    createForConnect(inputData?: Partial<Prisma.FinanceCreateInput>): PromiseLike<Pick<Finance, "id">>;
}

export interface FinanceFactoryInterface<TOptions extends FinanceFactoryDefineOptions = FinanceFactoryDefineOptions> extends FinanceFactoryInterfaceWithoutTraits {
    use(name: FinanceTraitKeys<TOptions>, ...names: readonly FinanceTraitKeys<TOptions>[]): FinanceFactoryInterfaceWithoutTraits;
}

function autoGenerateFinanceScalarsOrEnums({ seq }: {
    readonly seq: number;
}): FinanceScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "Finance", fieldName: "year", isId: false, isUnique: false, seq })
    };
}

function defineFinanceFactoryInternal<TOptions extends FinanceFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): FinanceFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly FinanceTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Finance", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.FinanceCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateFinanceScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<FinanceFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<FinanceFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                team: isFinanceteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team
            };
            const data: Prisma.FinanceCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.FinanceCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Finance) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.FinanceCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().finance.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.FinanceCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.FinanceCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Finance" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: FinanceTraitKeys<TOptions>, ...names: readonly FinanceTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Finance} model.
 *
 * @param options
 * @returns factory {@link FinanceFactoryInterface}
 */
export function defineFinanceFactory<TOptions extends FinanceFactoryDefineOptions>(options: TOptions): FinanceFactoryInterface<TOptions> {
    return defineFinanceFactoryInternal(options);
}

type GameScalarOrEnumFields = {
    year: number;
    stage: number;
};

type GametournamentFactory = {
    _factoryFor: "Tournament";
    build: () => PromiseLike<Prisma.TournamentCreateNestedOneWithoutGameInput["create"]>;
};

type GameFactoryDefineInput = {
    id?: string;
    year?: number;
    stage?: number;
    period?: number;
    periodType?: PeriodType;
    status?: GameStatus;
    stageStartTime?: Date | null;
    stageEndTime?: Date | null;
    stagePausedTime?: Date | null;
    auction?: Prisma.AuctionCreateNestedManyWithoutGameInput;
    bid?: Prisma.BidCreateNestedManyWithoutGameInput;
    tournament: GametournamentFactory | Prisma.TournamentCreateNestedOneWithoutGameInput;
    periodId?: Prisma.PeriodCreateNestedManyWithoutGameInput;
    notification?: Prisma.NotificationCreateNestedManyWithoutGameInput;
    team?: Prisma.TeamCreateNestedManyWithoutGameInput;
};

type GameFactoryDefineOptions = {
    defaultData: Resolver<GameFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<GameFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isGametournamentFactory(x: GametournamentFactory | Prisma.TournamentCreateNestedOneWithoutGameInput | undefined): x is GametournamentFactory {
    return (x as any)?._factoryFor === "Tournament";
}

type GameTraitKeys<TOptions extends GameFactoryDefineOptions> = keyof TOptions["traits"];

export interface GameFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Game";
    build(inputData?: Partial<Prisma.GameCreateInput>): PromiseLike<Prisma.GameCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.GameCreateInput>): PromiseLike<Prisma.GameCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.GameCreateInput>[]): PromiseLike<Prisma.GameCreateInput[]>;
    pickForConnect(inputData: Game): Pick<Game, "id">;
    create(inputData?: Partial<Prisma.GameCreateInput>): PromiseLike<Game>;
    createList(inputData: number | readonly Partial<Prisma.GameCreateInput>[]): PromiseLike<Game[]>;
    createForConnect(inputData?: Partial<Prisma.GameCreateInput>): PromiseLike<Pick<Game, "id">>;
}

export interface GameFactoryInterface<TOptions extends GameFactoryDefineOptions = GameFactoryDefineOptions> extends GameFactoryInterfaceWithoutTraits {
    use(name: GameTraitKeys<TOptions>, ...names: readonly GameTraitKeys<TOptions>[]): GameFactoryInterfaceWithoutTraits;
}

function autoGenerateGameScalarsOrEnums({ seq }: {
    readonly seq: number;
}): GameScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "Game", fieldName: "year", isId: false, isUnique: false, seq }),
        stage: getScalarFieldValueGenerator().Int({ modelName: "Game", fieldName: "stage", isId: false, isUnique: false, seq })
    };
}

function defineGameFactoryInternal<TOptions extends GameFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): GameFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly GameTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Game", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.GameCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateGameScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<GameFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<GameFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                tournament: isGametournamentFactory(defaultData.tournament) ? {
                    create: await defaultData.tournament.build()
                } : defaultData.tournament
            };
            const data: Prisma.GameCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.GameCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Game) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.GameCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().game.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.GameCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.GameCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Game" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: GameTraitKeys<TOptions>, ...names: readonly GameTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Game} model.
 *
 * @param options
 * @returns factory {@link GameFactoryInterface}
 */
export function defineGameFactory<TOptions extends GameFactoryDefineOptions>(options: TOptions): GameFactoryInterface<TOptions> {
    return defineGameFactoryInternal(options);
}

type GlobalEventScalarOrEnumFields = {
    name: string;
    description: string;
    orderNo: number;
    type: GlobalEventType;
};

type GlobalEventFactoryDefineInput = {
    id?: string;
    name?: string;
    description?: string;
    orderNo?: number;
    type?: GlobalEventType;
};

type GlobalEventFactoryDefineOptions = {
    defaultData?: Resolver<GlobalEventFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<GlobalEventFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type GlobalEventTraitKeys<TOptions extends GlobalEventFactoryDefineOptions> = keyof TOptions["traits"];

export interface GlobalEventFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "GlobalEvent";
    build(inputData?: Partial<Prisma.GlobalEventCreateInput>): PromiseLike<Prisma.GlobalEventCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.GlobalEventCreateInput>): PromiseLike<Prisma.GlobalEventCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.GlobalEventCreateInput>[]): PromiseLike<Prisma.GlobalEventCreateInput[]>;
    pickForConnect(inputData: GlobalEvent): Pick<GlobalEvent, "id">;
    create(inputData?: Partial<Prisma.GlobalEventCreateInput>): PromiseLike<GlobalEvent>;
    createList(inputData: number | readonly Partial<Prisma.GlobalEventCreateInput>[]): PromiseLike<GlobalEvent[]>;
    createForConnect(inputData?: Partial<Prisma.GlobalEventCreateInput>): PromiseLike<Pick<GlobalEvent, "id">>;
}

export interface GlobalEventFactoryInterface<TOptions extends GlobalEventFactoryDefineOptions = GlobalEventFactoryDefineOptions> extends GlobalEventFactoryInterfaceWithoutTraits {
    use(name: GlobalEventTraitKeys<TOptions>, ...names: readonly GlobalEventTraitKeys<TOptions>[]): GlobalEventFactoryInterfaceWithoutTraits;
}

function autoGenerateGlobalEventScalarsOrEnums({ seq }: {
    readonly seq: number;
}): GlobalEventScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "GlobalEvent", fieldName: "name", isId: false, isUnique: false, seq }),
        description: getScalarFieldValueGenerator().String({ modelName: "GlobalEvent", fieldName: "description", isId: false, isUnique: false, seq }),
        orderNo: getScalarFieldValueGenerator().Int({ modelName: "GlobalEvent", fieldName: "orderNo", isId: false, isUnique: false, seq }),
        type: "positiveRisk"
    };
}

function defineGlobalEventFactoryInternal<TOptions extends GlobalEventFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): GlobalEventFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly GlobalEventTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("GlobalEvent", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.GlobalEventCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateGlobalEventScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<GlobalEventFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<GlobalEventFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.GlobalEventCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.GlobalEventCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: GlobalEvent) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.GlobalEventCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().globalEvent.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.GlobalEventCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.GlobalEventCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "GlobalEvent" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: GlobalEventTraitKeys<TOptions>, ...names: readonly GlobalEventTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link GlobalEvent} model.
 *
 * @param options
 * @returns factory {@link GlobalEventFactoryInterface}
 */
export function defineGlobalEventFactory<TOptions extends GlobalEventFactoryDefineOptions>(options?: TOptions): GlobalEventFactoryInterface<TOptions> {
    return defineGlobalEventFactoryInternal(options ?? {});
}

type JobTitleScalarOrEnumFields = {
    name: string;
};

type JobTitleFactoryDefineInput = {
    id?: string;
    name?: string;
    member?: Prisma.MemberCreateNestedManyWithoutJobTitleInput;
};

type JobTitleFactoryDefineOptions = {
    defaultData?: Resolver<JobTitleFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<JobTitleFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type JobTitleTraitKeys<TOptions extends JobTitleFactoryDefineOptions> = keyof TOptions["traits"];

export interface JobTitleFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "JobTitle";
    build(inputData?: Partial<Prisma.JobTitleCreateInput>): PromiseLike<Prisma.JobTitleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.JobTitleCreateInput>): PromiseLike<Prisma.JobTitleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.JobTitleCreateInput>[]): PromiseLike<Prisma.JobTitleCreateInput[]>;
    pickForConnect(inputData: JobTitle): Pick<JobTitle, "id">;
    create(inputData?: Partial<Prisma.JobTitleCreateInput>): PromiseLike<JobTitle>;
    createList(inputData: number | readonly Partial<Prisma.JobTitleCreateInput>[]): PromiseLike<JobTitle[]>;
    createForConnect(inputData?: Partial<Prisma.JobTitleCreateInput>): PromiseLike<Pick<JobTitle, "id">>;
}

export interface JobTitleFactoryInterface<TOptions extends JobTitleFactoryDefineOptions = JobTitleFactoryDefineOptions> extends JobTitleFactoryInterfaceWithoutTraits {
    use(name: JobTitleTraitKeys<TOptions>, ...names: readonly JobTitleTraitKeys<TOptions>[]): JobTitleFactoryInterfaceWithoutTraits;
}

function autoGenerateJobTitleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): JobTitleScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "JobTitle", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineJobTitleFactoryInternal<TOptions extends JobTitleFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): JobTitleFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly JobTitleTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("JobTitle", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.JobTitleCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateJobTitleScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<JobTitleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<JobTitleFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.JobTitleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.JobTitleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: JobTitle) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.JobTitleCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().jobTitle.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.JobTitleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.JobTitleCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "JobTitle" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: JobTitleTraitKeys<TOptions>, ...names: readonly JobTitleTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link JobTitle} model.
 *
 * @param options
 * @returns factory {@link JobTitleFactoryInterface}
 */
export function defineJobTitleFactory<TOptions extends JobTitleFactoryDefineOptions>(options?: TOptions): JobTitleFactoryInterface<TOptions> {
    return defineJobTitleFactoryInternal(options ?? {});
}

type LocalEventScalarOrEnumFields = {
    name: string;
    description: string;
    output: string;
    type: LocalEventType;
};

type LocalEventFactoryDefineInput = {
    id?: string;
    name?: string;
    description?: string;
    output?: string;
    type?: LocalEventType;
    localEvents?: Prisma.TeamLocalEventCreateNestedManyWithoutLocalEventInput;
};

type LocalEventFactoryDefineOptions = {
    defaultData?: Resolver<LocalEventFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<LocalEventFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type LocalEventTraitKeys<TOptions extends LocalEventFactoryDefineOptions> = keyof TOptions["traits"];

export interface LocalEventFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "LocalEvent";
    build(inputData?: Partial<Prisma.LocalEventCreateInput>): PromiseLike<Prisma.LocalEventCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.LocalEventCreateInput>): PromiseLike<Prisma.LocalEventCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.LocalEventCreateInput>[]): PromiseLike<Prisma.LocalEventCreateInput[]>;
    pickForConnect(inputData: LocalEvent): Pick<LocalEvent, "id">;
    create(inputData?: Partial<Prisma.LocalEventCreateInput>): PromiseLike<LocalEvent>;
    createList(inputData: number | readonly Partial<Prisma.LocalEventCreateInput>[]): PromiseLike<LocalEvent[]>;
    createForConnect(inputData?: Partial<Prisma.LocalEventCreateInput>): PromiseLike<Pick<LocalEvent, "id">>;
}

export interface LocalEventFactoryInterface<TOptions extends LocalEventFactoryDefineOptions = LocalEventFactoryDefineOptions> extends LocalEventFactoryInterfaceWithoutTraits {
    use(name: LocalEventTraitKeys<TOptions>, ...names: readonly LocalEventTraitKeys<TOptions>[]): LocalEventFactoryInterfaceWithoutTraits;
}

function autoGenerateLocalEventScalarsOrEnums({ seq }: {
    readonly seq: number;
}): LocalEventScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "LocalEvent", fieldName: "name", isId: false, isUnique: false, seq }),
        description: getScalarFieldValueGenerator().String({ modelName: "LocalEvent", fieldName: "description", isId: false, isUnique: false, seq }),
        output: getScalarFieldValueGenerator().String({ modelName: "LocalEvent", fieldName: "output", isId: false, isUnique: false, seq }),
        type: "positive"
    };
}

function defineLocalEventFactoryInternal<TOptions extends LocalEventFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): LocalEventFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly LocalEventTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("LocalEvent", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.LocalEventCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateLocalEventScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<LocalEventFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<LocalEventFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.LocalEventCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.LocalEventCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: LocalEvent) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.LocalEventCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().localEvent.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.LocalEventCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.LocalEventCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "LocalEvent" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: LocalEventTraitKeys<TOptions>, ...names: readonly LocalEventTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link LocalEvent} model.
 *
 * @param options
 * @returns factory {@link LocalEventFactoryInterface}
 */
export function defineLocalEventFactory<TOptions extends LocalEventFactoryDefineOptions>(options?: TOptions): LocalEventFactoryInterface<TOptions> {
    return defineLocalEventFactoryInternal(options ?? {});
}

type MemberScalarOrEnumFields = {
    name: string;
};

type MemberjobTitleFactory = {
    _factoryFor: "JobTitle";
    build: () => PromiseLike<Prisma.JobTitleCreateNestedOneWithoutMemberInput["create"]>;
};

type MemberteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutMemberInput["create"]>;
};

type MemberFactoryDefineInput = {
    id?: string;
    name?: string;
    jobTitle: MemberjobTitleFactory | Prisma.JobTitleCreateNestedOneWithoutMemberInput;
    team: MemberteamFactory | Prisma.TeamCreateNestedOneWithoutMemberInput;
};

type MemberFactoryDefineOptions = {
    defaultData: Resolver<MemberFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<MemberFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isMemberjobTitleFactory(x: MemberjobTitleFactory | Prisma.JobTitleCreateNestedOneWithoutMemberInput | undefined): x is MemberjobTitleFactory {
    return (x as any)?._factoryFor === "JobTitle";
}

function isMemberteamFactory(x: MemberteamFactory | Prisma.TeamCreateNestedOneWithoutMemberInput | undefined): x is MemberteamFactory {
    return (x as any)?._factoryFor === "Team";
}

type MemberTraitKeys<TOptions extends MemberFactoryDefineOptions> = keyof TOptions["traits"];

export interface MemberFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Member";
    build(inputData?: Partial<Prisma.MemberCreateInput>): PromiseLike<Prisma.MemberCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.MemberCreateInput>): PromiseLike<Prisma.MemberCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.MemberCreateInput>[]): PromiseLike<Prisma.MemberCreateInput[]>;
    pickForConnect(inputData: Member): Pick<Member, "id">;
    create(inputData?: Partial<Prisma.MemberCreateInput>): PromiseLike<Member>;
    createList(inputData: number | readonly Partial<Prisma.MemberCreateInput>[]): PromiseLike<Member[]>;
    createForConnect(inputData?: Partial<Prisma.MemberCreateInput>): PromiseLike<Pick<Member, "id">>;
}

export interface MemberFactoryInterface<TOptions extends MemberFactoryDefineOptions = MemberFactoryDefineOptions> extends MemberFactoryInterfaceWithoutTraits {
    use(name: MemberTraitKeys<TOptions>, ...names: readonly MemberTraitKeys<TOptions>[]): MemberFactoryInterfaceWithoutTraits;
}

function autoGenerateMemberScalarsOrEnums({ seq }: {
    readonly seq: number;
}): MemberScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Member", fieldName: "name", isId: false, isUnique: false, seq })
    };
}

function defineMemberFactoryInternal<TOptions extends MemberFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): MemberFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly MemberTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Member", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.MemberCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateMemberScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<MemberFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<MemberFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                jobTitle: isMemberjobTitleFactory(defaultData.jobTitle) ? {
                    create: await defaultData.jobTitle.build()
                } : defaultData.jobTitle,
                team: isMemberteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team
            };
            const data: Prisma.MemberCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.MemberCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Member) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.MemberCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().member.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.MemberCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.MemberCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Member" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: MemberTraitKeys<TOptions>, ...names: readonly MemberTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Member} model.
 *
 * @param options
 * @returns factory {@link MemberFactoryInterface}
 */
export function defineMemberFactory<TOptions extends MemberFactoryDefineOptions>(options: TOptions): MemberFactoryInterface<TOptions> {
    return defineMemberFactoryInternal(options);
}

type NotificationScalarOrEnumFields = {
    year: number;
    stage: number;
    message: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
    type: NotificationType;
};

type NotificationgameFactory = {
    _factoryFor: "Game";
    build: () => PromiseLike<Prisma.GameCreateNestedOneWithoutNotificationInput["create"]>;
};

type NotificationteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutNotificationInput["create"]>;
};

type NotificationcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutNotificationCreatedInput["create"]>;
};

type NotificationmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutNotificationModifiedInput["create"]>;
};

type NotificationFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    year?: number;
    stage?: number;
    message?: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
    type?: NotificationType;
    game?: NotificationgameFactory | Prisma.GameCreateNestedOneWithoutNotificationInput;
    team?: NotificationteamFactory | Prisma.TeamCreateNestedOneWithoutNotificationInput;
    createdBy?: NotificationcreatedByFactory | Prisma.UserCreateNestedOneWithoutNotificationCreatedInput;
    modifiedBy?: NotificationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutNotificationModifiedInput;
};

type NotificationFactoryDefineOptions = {
    defaultData?: Resolver<NotificationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<NotificationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isNotificationgameFactory(x: NotificationgameFactory | Prisma.GameCreateNestedOneWithoutNotificationInput | undefined): x is NotificationgameFactory {
    return (x as any)?._factoryFor === "Game";
}

function isNotificationteamFactory(x: NotificationteamFactory | Prisma.TeamCreateNestedOneWithoutNotificationInput | undefined): x is NotificationteamFactory {
    return (x as any)?._factoryFor === "Team";
}

function isNotificationcreatedByFactory(x: NotificationcreatedByFactory | Prisma.UserCreateNestedOneWithoutNotificationCreatedInput | undefined): x is NotificationcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isNotificationmodifiedByFactory(x: NotificationmodifiedByFactory | Prisma.UserCreateNestedOneWithoutNotificationModifiedInput | undefined): x is NotificationmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type NotificationTraitKeys<TOptions extends NotificationFactoryDefineOptions> = keyof TOptions["traits"];

export interface NotificationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Notification";
    build(inputData?: Partial<Prisma.NotificationCreateInput>): PromiseLike<Prisma.NotificationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.NotificationCreateInput>): PromiseLike<Prisma.NotificationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.NotificationCreateInput>[]): PromiseLike<Prisma.NotificationCreateInput[]>;
    pickForConnect(inputData: Notification): Pick<Notification, "id">;
    create(inputData?: Partial<Prisma.NotificationCreateInput>): PromiseLike<Notification>;
    createList(inputData: number | readonly Partial<Prisma.NotificationCreateInput>[]): PromiseLike<Notification[]>;
    createForConnect(inputData?: Partial<Prisma.NotificationCreateInput>): PromiseLike<Pick<Notification, "id">>;
}

export interface NotificationFactoryInterface<TOptions extends NotificationFactoryDefineOptions = NotificationFactoryDefineOptions> extends NotificationFactoryInterfaceWithoutTraits {
    use(name: NotificationTraitKeys<TOptions>, ...names: readonly NotificationTraitKeys<TOptions>[]): NotificationFactoryInterfaceWithoutTraits;
}

function autoGenerateNotificationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): NotificationScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "Notification", fieldName: "year", isId: false, isUnique: false, seq }),
        stage: getScalarFieldValueGenerator().Int({ modelName: "Notification", fieldName: "stage", isId: false, isUnique: false, seq }),
        message: getScalarFieldValueGenerator().Json({ modelName: "Notification", fieldName: "message", isId: false, isUnique: false, seq }),
        type: "endOfYearType"
    };
}

function defineNotificationFactoryInternal<TOptions extends NotificationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): NotificationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly NotificationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Notification", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.NotificationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateNotificationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<NotificationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<NotificationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                game: isNotificationgameFactory(defaultData.game) ? {
                    create: await defaultData.game.build()
                } : defaultData.game,
                team: isNotificationteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team,
                createdBy: isNotificationcreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isNotificationmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.NotificationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.NotificationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Notification) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.NotificationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().notification.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.NotificationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.NotificationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Notification" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: NotificationTraitKeys<TOptions>, ...names: readonly NotificationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Notification} model.
 *
 * @param options
 * @returns factory {@link NotificationFactoryInterface}
 */
export function defineNotificationFactory<TOptions extends NotificationFactoryDefineOptions>(options?: TOptions): NotificationFactoryInterface<TOptions> {
    return defineNotificationFactoryInternal(options ?? {});
}

type PeriodScalarOrEnumFields = {
    year: number;
    periodOrder: number;
    stage: number;
    periodLength: number;
    type: PeriodType;
};

type PeriodgameFactory = {
    _factoryFor: "Game";
    build: () => PromiseLike<Prisma.GameCreateNestedOneWithoutPeriodIdInput["create"]>;
};

type PeriodFactoryDefineInput = {
    id?: string;
    year?: number;
    periodOrder?: number;
    stage?: number;
    periodLength?: number;
    type?: PeriodType;
    game: PeriodgameFactory | Prisma.GameCreateNestedOneWithoutPeriodIdInput;
};

type PeriodFactoryDefineOptions = {
    defaultData: Resolver<PeriodFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<PeriodFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isPeriodgameFactory(x: PeriodgameFactory | Prisma.GameCreateNestedOneWithoutPeriodIdInput | undefined): x is PeriodgameFactory {
    return (x as any)?._factoryFor === "Game";
}

type PeriodTraitKeys<TOptions extends PeriodFactoryDefineOptions> = keyof TOptions["traits"];

export interface PeriodFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Period";
    build(inputData?: Partial<Prisma.PeriodCreateInput>): PromiseLike<Prisma.PeriodCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PeriodCreateInput>): PromiseLike<Prisma.PeriodCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PeriodCreateInput>[]): PromiseLike<Prisma.PeriodCreateInput[]>;
    pickForConnect(inputData: Period): Pick<Period, "id">;
    create(inputData?: Partial<Prisma.PeriodCreateInput>): PromiseLike<Period>;
    createList(inputData: number | readonly Partial<Prisma.PeriodCreateInput>[]): PromiseLike<Period[]>;
    createForConnect(inputData?: Partial<Prisma.PeriodCreateInput>): PromiseLike<Pick<Period, "id">>;
}

export interface PeriodFactoryInterface<TOptions extends PeriodFactoryDefineOptions = PeriodFactoryDefineOptions> extends PeriodFactoryInterfaceWithoutTraits {
    use(name: PeriodTraitKeys<TOptions>, ...names: readonly PeriodTraitKeys<TOptions>[]): PeriodFactoryInterfaceWithoutTraits;
}

function autoGeneratePeriodScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PeriodScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "Period", fieldName: "year", isId: false, isUnique: false, seq }),
        periodOrder: getScalarFieldValueGenerator().Int({ modelName: "Period", fieldName: "periodOrder", isId: false, isUnique: false, seq }),
        stage: getScalarFieldValueGenerator().Int({ modelName: "Period", fieldName: "stage", isId: false, isUnique: false, seq }),
        periodLength: getScalarFieldValueGenerator().Int({ modelName: "Period", fieldName: "periodLength", isId: false, isUnique: false, seq }),
        type: "welcome"
    };
}

function definePeriodFactoryInternal<TOptions extends PeriodFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): PeriodFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly PeriodTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Period", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.PeriodCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePeriodScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PeriodFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PeriodFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                game: isPeriodgameFactory(defaultData.game) ? {
                    create: await defaultData.game.build()
                } : defaultData.game
            };
            const data: Prisma.PeriodCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.PeriodCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Period) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PeriodCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().period.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.PeriodCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PeriodCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Period" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PeriodTraitKeys<TOptions>, ...names: readonly PeriodTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Period} model.
 *
 * @param options
 * @returns factory {@link PeriodFactoryInterface}
 */
export function definePeriodFactory<TOptions extends PeriodFactoryDefineOptions>(options: TOptions): PeriodFactoryInterface<TOptions> {
    return definePeriodFactoryInternal(options);
}

type QuestionScalarOrEnumFields = {
    name: string;
    year: number;
};

type QuestioncorrectAnswerFactory = {
    _factoryFor: "Answer";
    build: () => PromiseLike<Prisma.AnswerCreateNestedOneWithoutCorrectQuestionInput["create"]>;
};

type QuestionFactoryDefineInput = {
    id?: string;
    name?: string;
    type?: QuestionType;
    metadata?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
    year?: number;
    answer?: Prisma.AnswerCreateNestedManyWithoutQuestionInput;
    correctAnswer?: QuestioncorrectAnswerFactory | Prisma.AnswerCreateNestedOneWithoutCorrectQuestionInput;
    questions?: Prisma.TeamQuestionCreateNestedManyWithoutQuestionInput;
};

type QuestionFactoryDefineOptions = {
    defaultData?: Resolver<QuestionFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<QuestionFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isQuestioncorrectAnswerFactory(x: QuestioncorrectAnswerFactory | Prisma.AnswerCreateNestedOneWithoutCorrectQuestionInput | undefined): x is QuestioncorrectAnswerFactory {
    return (x as any)?._factoryFor === "Answer";
}

type QuestionTraitKeys<TOptions extends QuestionFactoryDefineOptions> = keyof TOptions["traits"];

export interface QuestionFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Question";
    build(inputData?: Partial<Prisma.QuestionCreateInput>): PromiseLike<Prisma.QuestionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.QuestionCreateInput>): PromiseLike<Prisma.QuestionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.QuestionCreateInput>[]): PromiseLike<Prisma.QuestionCreateInput[]>;
    pickForConnect(inputData: Question): Pick<Question, "correctAnswerId">;
    create(inputData?: Partial<Prisma.QuestionCreateInput>): PromiseLike<Question>;
    createList(inputData: number | readonly Partial<Prisma.QuestionCreateInput>[]): PromiseLike<Question[]>;
    createForConnect(inputData?: Partial<Prisma.QuestionCreateInput>): PromiseLike<Pick<Question, "correctAnswerId">>;
}

export interface QuestionFactoryInterface<TOptions extends QuestionFactoryDefineOptions = QuestionFactoryDefineOptions> extends QuestionFactoryInterfaceWithoutTraits {
    use(name: QuestionTraitKeys<TOptions>, ...names: readonly QuestionTraitKeys<TOptions>[]): QuestionFactoryInterfaceWithoutTraits;
}

function autoGenerateQuestionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): QuestionScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Question", fieldName: "name", isId: false, isUnique: false, seq }),
        year: getScalarFieldValueGenerator().Int({ modelName: "Question", fieldName: "year", isId: false, isUnique: false, seq })
    };
}

function defineQuestionFactoryInternal<TOptions extends QuestionFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): QuestionFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly QuestionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Question", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.QuestionCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateQuestionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<QuestionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<QuestionFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                correctAnswer: isQuestioncorrectAnswerFactory(defaultData.correctAnswer) ? {
                    create: await defaultData.correctAnswer.build()
                } : defaultData.correctAnswer
            };
            const data: Prisma.QuestionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.QuestionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Question) => ({
            correctAnswerId: inputData.correctAnswerId
        });
        const create = async (inputData: Partial<Prisma.QuestionCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().question.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.QuestionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.QuestionCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Question" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: QuestionTraitKeys<TOptions>, ...names: readonly QuestionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Question} model.
 *
 * @param options
 * @returns factory {@link QuestionFactoryInterface}
 */
export function defineQuestionFactory<TOptions extends QuestionFactoryDefineOptions>(options?: TOptions): QuestionFactoryInterface<TOptions> {
    return defineQuestionFactoryInternal(options ?? {});
}

type SectorScalarOrEnumFields = {
    name: string;
};

type SectorFactoryDefineInput = {
    id?: string;
    name?: string;
    company?: Prisma.CompanyCreateNestedManyWithoutSectorInput;
};

type SectorFactoryDefineOptions = {
    defaultData?: Resolver<SectorFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<SectorFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type SectorTraitKeys<TOptions extends SectorFactoryDefineOptions> = keyof TOptions["traits"];

export interface SectorFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Sector";
    build(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Prisma.SectorCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Prisma.SectorCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.SectorCreateInput>[]): PromiseLike<Prisma.SectorCreateInput[]>;
    pickForConnect(inputData: Sector): Pick<Sector, "id">;
    create(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Sector>;
    createList(inputData: number | readonly Partial<Prisma.SectorCreateInput>[]): PromiseLike<Sector[]>;
    createForConnect(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Pick<Sector, "id">>;
}

export interface SectorFactoryInterface<TOptions extends SectorFactoryDefineOptions = SectorFactoryDefineOptions> extends SectorFactoryInterfaceWithoutTraits {
    use(name: SectorTraitKeys<TOptions>, ...names: readonly SectorTraitKeys<TOptions>[]): SectorFactoryInterfaceWithoutTraits;
}

function autoGenerateSectorScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SectorScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Sector", fieldName: "name", isId: false, isUnique: true, seq })
    };
}

function defineSectorFactoryInternal<TOptions extends SectorFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): SectorFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly SectorTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Sector", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.SectorCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSectorScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SectorFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SectorFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.SectorCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.SectorCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Sector) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.SectorCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().sector.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.SectorCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SectorCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Sector" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SectorTraitKeys<TOptions>, ...names: readonly SectorTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Sector} model.
 *
 * @param options
 * @returns factory {@link SectorFactoryInterface}
 */
export function defineSectorFactory<TOptions extends SectorFactoryDefineOptions>(options?: TOptions): SectorFactoryInterface<TOptions> {
    return defineSectorFactoryInternal(options ?? {});
}

type SettingScalarOrEnumFields = {
    key: string;
    value: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
};

type SettingFactoryDefineInput = {
    id?: string;
    key?: string;
    value?: Prisma.JsonNullValueInput | Prisma.InputJsonValue;
};

type SettingFactoryDefineOptions = {
    defaultData?: Resolver<SettingFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<SettingFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type SettingTraitKeys<TOptions extends SettingFactoryDefineOptions> = keyof TOptions["traits"];

export interface SettingFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Setting";
    build(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Prisma.SettingCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Prisma.SettingCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.SettingCreateInput>[]): PromiseLike<Prisma.SettingCreateInput[]>;
    pickForConnect(inputData: Setting): Pick<Setting, "id">;
    create(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Setting>;
    createList(inputData: number | readonly Partial<Prisma.SettingCreateInput>[]): PromiseLike<Setting[]>;
    createForConnect(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Pick<Setting, "id">>;
}

export interface SettingFactoryInterface<TOptions extends SettingFactoryDefineOptions = SettingFactoryDefineOptions> extends SettingFactoryInterfaceWithoutTraits {
    use(name: SettingTraitKeys<TOptions>, ...names: readonly SettingTraitKeys<TOptions>[]): SettingFactoryInterfaceWithoutTraits;
}

function autoGenerateSettingScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SettingScalarOrEnumFields {
    return {
        key: getScalarFieldValueGenerator().String({ modelName: "Setting", fieldName: "key", isId: false, isUnique: true, seq }),
        value: getScalarFieldValueGenerator().Json({ modelName: "Setting", fieldName: "value", isId: false, isUnique: false, seq })
    };
}

function defineSettingFactoryInternal<TOptions extends SettingFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): SettingFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly SettingTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Setting", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.SettingCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSettingScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SettingFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SettingFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.SettingCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.SettingCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Setting) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.SettingCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().setting.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.SettingCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SettingCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Setting" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SettingTraitKeys<TOptions>, ...names: readonly SettingTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Setting} model.
 *
 * @param options
 * @returns factory {@link SettingFactoryInterface}
 */
export function defineSettingFactory<TOptions extends SettingFactoryDefineOptions>(options?: TOptions): SettingFactoryInterface<TOptions> {
    return defineSettingFactoryInternal(options ?? {});
}

type TeamScalarOrEnumFields = {
    status: TeamStatus;
};

type TeamgameFactory = {
    _factoryFor: "Game";
    build: () => PromiseLike<Prisma.GameCreateNestedOneWithoutTeamInput["create"]>;
};

type TeamtournamentFactory = {
    _factoryFor: "Tournament";
    build: () => PromiseLike<Prisma.TournamentCreateNestedOneWithoutTeamInput["create"]>;
};

type TeamFactoryDefineInput = {
    id?: string;
    name?: string | null;
    status?: TeamStatus;
    gameRating?: number | null;
    registrationNumber?: string | null;
    balanceSheet?: Prisma.BalanceSheetCreateNestedManyWithoutTeamInput;
    bid?: Prisma.BidCreateNestedManyWithoutTeamInput;
    finance?: Prisma.FinanceCreateNestedManyWithoutTeamInput;
    member?: Prisma.MemberCreateNestedManyWithoutTeamInput;
    notification?: Prisma.NotificationCreateNestedManyWithoutTeamInput;
    game?: TeamgameFactory | Prisma.GameCreateNestedOneWithoutTeamInput;
    teams?: Prisma.TeamQuestionCreateNestedManyWithoutTeamInput;
    tournament: TeamtournamentFactory | Prisma.TournamentCreateNestedOneWithoutTeamInput;
    teamCompany?: Prisma.TeamCompanyCreateNestedManyWithoutTeamInput;
    teamEvents?: Prisma.TeamLocalEventCreateNestedManyWithoutTeamInput;
    accountsSheet?: Prisma.AccountsSheetCreateNestedManyWithoutTeamInput;
};

type TeamFactoryDefineOptions = {
    defaultData: Resolver<TeamFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TeamFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTeamgameFactory(x: TeamgameFactory | Prisma.GameCreateNestedOneWithoutTeamInput | undefined): x is TeamgameFactory {
    return (x as any)?._factoryFor === "Game";
}

function isTeamtournamentFactory(x: TeamtournamentFactory | Prisma.TournamentCreateNestedOneWithoutTeamInput | undefined): x is TeamtournamentFactory {
    return (x as any)?._factoryFor === "Tournament";
}

type TeamTraitKeys<TOptions extends TeamFactoryDefineOptions> = keyof TOptions["traits"];

export interface TeamFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Team";
    build(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Prisma.TeamCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Prisma.TeamCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TeamCreateInput>[]): PromiseLike<Prisma.TeamCreateInput[]>;
    pickForConnect(inputData: Team): Pick<Team, "id">;
    create(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Team>;
    createList(inputData: number | readonly Partial<Prisma.TeamCreateInput>[]): PromiseLike<Team[]>;
    createForConnect(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Pick<Team, "id">>;
}

export interface TeamFactoryInterface<TOptions extends TeamFactoryDefineOptions = TeamFactoryDefineOptions> extends TeamFactoryInterfaceWithoutTraits {
    use(name: TeamTraitKeys<TOptions>, ...names: readonly TeamTraitKeys<TOptions>[]): TeamFactoryInterfaceWithoutTraits;
}

function autoGenerateTeamScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TeamScalarOrEnumFields {
    return {
        status: "awaitingTeamName"
    };
}

function defineTeamFactoryInternal<TOptions extends TeamFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TeamFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TeamTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Team", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TeamCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTeamScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TeamFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TeamFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                game: isTeamgameFactory(defaultData.game) ? {
                    create: await defaultData.game.build()
                } : defaultData.game,
                tournament: isTeamtournamentFactory(defaultData.tournament) ? {
                    create: await defaultData.tournament.build()
                } : defaultData.tournament
            };
            const data: Prisma.TeamCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TeamCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Team) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TeamCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().team.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TeamCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TeamCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Team" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TeamTraitKeys<TOptions>, ...names: readonly TeamTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Team} model.
 *
 * @param options
 * @returns factory {@link TeamFactoryInterface}
 */
export function defineTeamFactory<TOptions extends TeamFactoryDefineOptions>(options: TOptions): TeamFactoryInterface<TOptions> {
    return defineTeamFactoryInternal(options);
}

type TeamCompanyScalarOrEnumFields = {
    yearBought: number;
};

type TeamCompanycompanyFactory = {
    _factoryFor: "Company";
    build: () => PromiseLike<Prisma.CompanyCreateNestedOneWithoutTeamCompanyInput["create"]>;
};

type TeamCompanyteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutTeamCompanyInput["create"]>;
};

type TeamCompanyFactoryDefineInput = {
    id?: string;
    yearBought?: number;
    yearSold?: number | null;
    company: TeamCompanycompanyFactory | Prisma.CompanyCreateNestedOneWithoutTeamCompanyInput;
    team: TeamCompanyteamFactory | Prisma.TeamCreateNestedOneWithoutTeamCompanyInput;
};

type TeamCompanyFactoryDefineOptions = {
    defaultData: Resolver<TeamCompanyFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TeamCompanyFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTeamCompanycompanyFactory(x: TeamCompanycompanyFactory | Prisma.CompanyCreateNestedOneWithoutTeamCompanyInput | undefined): x is TeamCompanycompanyFactory {
    return (x as any)?._factoryFor === "Company";
}

function isTeamCompanyteamFactory(x: TeamCompanyteamFactory | Prisma.TeamCreateNestedOneWithoutTeamCompanyInput | undefined): x is TeamCompanyteamFactory {
    return (x as any)?._factoryFor === "Team";
}

type TeamCompanyTraitKeys<TOptions extends TeamCompanyFactoryDefineOptions> = keyof TOptions["traits"];

export interface TeamCompanyFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "TeamCompany";
    build(inputData?: Partial<Prisma.TeamCompanyCreateInput>): PromiseLike<Prisma.TeamCompanyCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TeamCompanyCreateInput>): PromiseLike<Prisma.TeamCompanyCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TeamCompanyCreateInput>[]): PromiseLike<Prisma.TeamCompanyCreateInput[]>;
    pickForConnect(inputData: TeamCompany): Pick<TeamCompany, "id">;
    create(inputData?: Partial<Prisma.TeamCompanyCreateInput>): PromiseLike<TeamCompany>;
    createList(inputData: number | readonly Partial<Prisma.TeamCompanyCreateInput>[]): PromiseLike<TeamCompany[]>;
    createForConnect(inputData?: Partial<Prisma.TeamCompanyCreateInput>): PromiseLike<Pick<TeamCompany, "id">>;
}

export interface TeamCompanyFactoryInterface<TOptions extends TeamCompanyFactoryDefineOptions = TeamCompanyFactoryDefineOptions> extends TeamCompanyFactoryInterfaceWithoutTraits {
    use(name: TeamCompanyTraitKeys<TOptions>, ...names: readonly TeamCompanyTraitKeys<TOptions>[]): TeamCompanyFactoryInterfaceWithoutTraits;
}

function autoGenerateTeamCompanyScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TeamCompanyScalarOrEnumFields {
    return {
        yearBought: getScalarFieldValueGenerator().Int({ modelName: "TeamCompany", fieldName: "yearBought", isId: false, isUnique: false, seq })
    };
}

function defineTeamCompanyFactoryInternal<TOptions extends TeamCompanyFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TeamCompanyFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TeamCompanyTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("TeamCompany", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TeamCompanyCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTeamCompanyScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TeamCompanyFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TeamCompanyFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                company: isTeamCompanycompanyFactory(defaultData.company) ? {
                    create: await defaultData.company.build()
                } : defaultData.company,
                team: isTeamCompanyteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team
            };
            const data: Prisma.TeamCompanyCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TeamCompanyCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: TeamCompany) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TeamCompanyCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().teamCompany.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TeamCompanyCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TeamCompanyCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "TeamCompany" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TeamCompanyTraitKeys<TOptions>, ...names: readonly TeamCompanyTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link TeamCompany} model.
 *
 * @param options
 * @returns factory {@link TeamCompanyFactoryInterface}
 */
export function defineTeamCompanyFactory<TOptions extends TeamCompanyFactoryDefineOptions>(options: TOptions): TeamCompanyFactoryInterface<TOptions> {
    return defineTeamCompanyFactoryInternal(options);
}

type TeamLocalEventScalarOrEnumFields = {
    year: number;
};

type TeamLocalEventteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutTeamEventsInput["create"]>;
};

type TeamLocalEventlocalEventFactory = {
    _factoryFor: "LocalEvent";
    build: () => PromiseLike<Prisma.LocalEventCreateNestedOneWithoutLocalEventsInput["create"]>;
};

type TeamLocalEventFactoryDefineInput = {
    id?: string;
    year?: number;
    cardSelected?: number | null;
    team: TeamLocalEventteamFactory | Prisma.TeamCreateNestedOneWithoutTeamEventsInput;
    localEvent: TeamLocalEventlocalEventFactory | Prisma.LocalEventCreateNestedOneWithoutLocalEventsInput;
};

type TeamLocalEventFactoryDefineOptions = {
    defaultData: Resolver<TeamLocalEventFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TeamLocalEventFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTeamLocalEventteamFactory(x: TeamLocalEventteamFactory | Prisma.TeamCreateNestedOneWithoutTeamEventsInput | undefined): x is TeamLocalEventteamFactory {
    return (x as any)?._factoryFor === "Team";
}

function isTeamLocalEventlocalEventFactory(x: TeamLocalEventlocalEventFactory | Prisma.LocalEventCreateNestedOneWithoutLocalEventsInput | undefined): x is TeamLocalEventlocalEventFactory {
    return (x as any)?._factoryFor === "LocalEvent";
}

type TeamLocalEventTraitKeys<TOptions extends TeamLocalEventFactoryDefineOptions> = keyof TOptions["traits"];

export interface TeamLocalEventFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "TeamLocalEvent";
    build(inputData?: Partial<Prisma.TeamLocalEventCreateInput>): PromiseLike<Prisma.TeamLocalEventCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TeamLocalEventCreateInput>): PromiseLike<Prisma.TeamLocalEventCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TeamLocalEventCreateInput>[]): PromiseLike<Prisma.TeamLocalEventCreateInput[]>;
    pickForConnect(inputData: TeamLocalEvent): Pick<TeamLocalEvent, "id">;
    create(inputData?: Partial<Prisma.TeamLocalEventCreateInput>): PromiseLike<TeamLocalEvent>;
    createList(inputData: number | readonly Partial<Prisma.TeamLocalEventCreateInput>[]): PromiseLike<TeamLocalEvent[]>;
    createForConnect(inputData?: Partial<Prisma.TeamLocalEventCreateInput>): PromiseLike<Pick<TeamLocalEvent, "id">>;
}

export interface TeamLocalEventFactoryInterface<TOptions extends TeamLocalEventFactoryDefineOptions = TeamLocalEventFactoryDefineOptions> extends TeamLocalEventFactoryInterfaceWithoutTraits {
    use(name: TeamLocalEventTraitKeys<TOptions>, ...names: readonly TeamLocalEventTraitKeys<TOptions>[]): TeamLocalEventFactoryInterfaceWithoutTraits;
}

function autoGenerateTeamLocalEventScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TeamLocalEventScalarOrEnumFields {
    return {
        year: getScalarFieldValueGenerator().Int({ modelName: "TeamLocalEvent", fieldName: "year", isId: false, isUnique: false, seq })
    };
}

function defineTeamLocalEventFactoryInternal<TOptions extends TeamLocalEventFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TeamLocalEventFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TeamLocalEventTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("TeamLocalEvent", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TeamLocalEventCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTeamLocalEventScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TeamLocalEventFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TeamLocalEventFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                team: isTeamLocalEventteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team,
                localEvent: isTeamLocalEventlocalEventFactory(defaultData.localEvent) ? {
                    create: await defaultData.localEvent.build()
                } : defaultData.localEvent
            };
            const data: Prisma.TeamLocalEventCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TeamLocalEventCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: TeamLocalEvent) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TeamLocalEventCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().teamLocalEvent.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TeamLocalEventCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TeamLocalEventCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "TeamLocalEvent" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TeamLocalEventTraitKeys<TOptions>, ...names: readonly TeamLocalEventTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link TeamLocalEvent} model.
 *
 * @param options
 * @returns factory {@link TeamLocalEventFactoryInterface}
 */
export function defineTeamLocalEventFactory<TOptions extends TeamLocalEventFactoryDefineOptions>(options: TOptions): TeamLocalEventFactoryInterface<TOptions> {
    return defineTeamLocalEventFactoryInternal(options);
}

type TeamQuestionScalarOrEnumFields = {};

type TeamQuestionquestionFactory = {
    _factoryFor: "Question";
    build: () => PromiseLike<Prisma.QuestionCreateNestedOneWithoutQuestionsInput["create"]>;
};

type TeamQuestionteamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutTeamsInput["create"]>;
};

type TeamQuestionselectedAnswerFactory = {
    _factoryFor: "Answer";
    build: () => PromiseLike<Prisma.AnswerCreateNestedOneWithoutTeamQuestionInput["create"]>;
};

type TeamQuestioncreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTeamQuestionCreatedInput["create"]>;
};

type TeamQuestionmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTeamQuestionModifiedInput["create"]>;
};

type TeamQuestionFactoryDefineInput = {
    orderNumber?: number | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    question: TeamQuestionquestionFactory | Prisma.QuestionCreateNestedOneWithoutQuestionsInput;
    team: TeamQuestionteamFactory | Prisma.TeamCreateNestedOneWithoutTeamsInput;
    selectedAnswer?: TeamQuestionselectedAnswerFactory | Prisma.AnswerCreateNestedOneWithoutTeamQuestionInput;
    createdBy?: TeamQuestioncreatedByFactory | Prisma.UserCreateNestedOneWithoutTeamQuestionCreatedInput;
    modifiedBy?: TeamQuestionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutTeamQuestionModifiedInput;
};

type TeamQuestionFactoryDefineOptions = {
    defaultData: Resolver<TeamQuestionFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TeamQuestionFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTeamQuestionquestionFactory(x: TeamQuestionquestionFactory | Prisma.QuestionCreateNestedOneWithoutQuestionsInput | undefined): x is TeamQuestionquestionFactory {
    return (x as any)?._factoryFor === "Question";
}

function isTeamQuestionteamFactory(x: TeamQuestionteamFactory | Prisma.TeamCreateNestedOneWithoutTeamsInput | undefined): x is TeamQuestionteamFactory {
    return (x as any)?._factoryFor === "Team";
}

function isTeamQuestionselectedAnswerFactory(x: TeamQuestionselectedAnswerFactory | Prisma.AnswerCreateNestedOneWithoutTeamQuestionInput | undefined): x is TeamQuestionselectedAnswerFactory {
    return (x as any)?._factoryFor === "Answer";
}

function isTeamQuestioncreatedByFactory(x: TeamQuestioncreatedByFactory | Prisma.UserCreateNestedOneWithoutTeamQuestionCreatedInput | undefined): x is TeamQuestioncreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isTeamQuestionmodifiedByFactory(x: TeamQuestionmodifiedByFactory | Prisma.UserCreateNestedOneWithoutTeamQuestionModifiedInput | undefined): x is TeamQuestionmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type TeamQuestionTraitKeys<TOptions extends TeamQuestionFactoryDefineOptions> = keyof TOptions["traits"];

export interface TeamQuestionFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "TeamQuestion";
    build(inputData?: Partial<Prisma.TeamQuestionCreateInput>): PromiseLike<Prisma.TeamQuestionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TeamQuestionCreateInput>): PromiseLike<Prisma.TeamQuestionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TeamQuestionCreateInput>[]): PromiseLike<Prisma.TeamQuestionCreateInput[]>;
    pickForConnect(inputData: TeamQuestion): Pick<TeamQuestion, "id">;
    create(inputData?: Partial<Prisma.TeamQuestionCreateInput>): PromiseLike<TeamQuestion>;
    createList(inputData: number | readonly Partial<Prisma.TeamQuestionCreateInput>[]): PromiseLike<TeamQuestion[]>;
    createForConnect(inputData?: Partial<Prisma.TeamQuestionCreateInput>): PromiseLike<Pick<TeamQuestion, "id">>;
}

export interface TeamQuestionFactoryInterface<TOptions extends TeamQuestionFactoryDefineOptions = TeamQuestionFactoryDefineOptions> extends TeamQuestionFactoryInterfaceWithoutTraits {
    use(name: TeamQuestionTraitKeys<TOptions>, ...names: readonly TeamQuestionTraitKeys<TOptions>[]): TeamQuestionFactoryInterfaceWithoutTraits;
}

function autoGenerateTeamQuestionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TeamQuestionScalarOrEnumFields {
    return {};
}

function defineTeamQuestionFactoryInternal<TOptions extends TeamQuestionFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TeamQuestionFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TeamQuestionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("TeamQuestion", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TeamQuestionCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTeamQuestionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TeamQuestionFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TeamQuestionFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                question: isTeamQuestionquestionFactory(defaultData.question) ? {
                    create: await defaultData.question.build()
                } : defaultData.question,
                team: isTeamQuestionteamFactory(defaultData.team) ? {
                    create: await defaultData.team.build()
                } : defaultData.team,
                selectedAnswer: isTeamQuestionselectedAnswerFactory(defaultData.selectedAnswer) ? {
                    create: await defaultData.selectedAnswer.build()
                } : defaultData.selectedAnswer,
                createdBy: isTeamQuestioncreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isTeamQuestionmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.TeamQuestionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TeamQuestionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: TeamQuestion) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TeamQuestionCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().teamQuestion.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TeamQuestionCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TeamQuestionCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "TeamQuestion" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TeamQuestionTraitKeys<TOptions>, ...names: readonly TeamQuestionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link TeamQuestion} model.
 *
 * @param options
 * @returns factory {@link TeamQuestionFactoryInterface}
 */
export function defineTeamQuestionFactory<TOptions extends TeamQuestionFactoryDefineOptions>(options: TOptions): TeamQuestionFactoryInterface<TOptions> {
    return defineTeamQuestionFactoryInternal(options);
}

type TournamentScalarOrEnumFields = {
    lobbyCode: string;
    practiceRound: boolean;
};

type TournamentcreatedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTournamentCreatedInput["create"]>;
};

type TournamentmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTournamentModifiedInput["create"]>;
};

type TournamentFactoryDefineInput = {
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    id?: string;
    lobbyCode?: string;
    finalYear?: number | null;
    practiceRound?: boolean;
    status?: TournamentStatus;
    instructorName?: string | null;
    game?: Prisma.GameCreateNestedManyWithoutTournamentInput;
    team?: Prisma.TeamCreateNestedManyWithoutTournamentInput;
    createdBy?: TournamentcreatedByFactory | Prisma.UserCreateNestedOneWithoutTournamentCreatedInput;
    modifiedBy?: TournamentmodifiedByFactory | Prisma.UserCreateNestedOneWithoutTournamentModifiedInput;
};

type TournamentFactoryDefineOptions = {
    defaultData?: Resolver<TournamentFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TournamentFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTournamentcreatedByFactory(x: TournamentcreatedByFactory | Prisma.UserCreateNestedOneWithoutTournamentCreatedInput | undefined): x is TournamentcreatedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isTournamentmodifiedByFactory(x: TournamentmodifiedByFactory | Prisma.UserCreateNestedOneWithoutTournamentModifiedInput | undefined): x is TournamentmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type TournamentTraitKeys<TOptions extends TournamentFactoryDefineOptions> = keyof TOptions["traits"];

export interface TournamentFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Tournament";
    build(inputData?: Partial<Prisma.TournamentCreateInput>): PromiseLike<Prisma.TournamentCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TournamentCreateInput>): PromiseLike<Prisma.TournamentCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TournamentCreateInput>[]): PromiseLike<Prisma.TournamentCreateInput[]>;
    pickForConnect(inputData: Tournament): Pick<Tournament, "id">;
    create(inputData?: Partial<Prisma.TournamentCreateInput>): PromiseLike<Tournament>;
    createList(inputData: number | readonly Partial<Prisma.TournamentCreateInput>[]): PromiseLike<Tournament[]>;
    createForConnect(inputData?: Partial<Prisma.TournamentCreateInput>): PromiseLike<Pick<Tournament, "id">>;
}

export interface TournamentFactoryInterface<TOptions extends TournamentFactoryDefineOptions = TournamentFactoryDefineOptions> extends TournamentFactoryInterfaceWithoutTraits {
    use(name: TournamentTraitKeys<TOptions>, ...names: readonly TournamentTraitKeys<TOptions>[]): TournamentFactoryInterfaceWithoutTraits;
}

function autoGenerateTournamentScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TournamentScalarOrEnumFields {
    return {
        lobbyCode: getScalarFieldValueGenerator().String({ modelName: "Tournament", fieldName: "lobbyCode", isId: false, isUnique: false, seq }),
        practiceRound: getScalarFieldValueGenerator().Boolean({ modelName: "Tournament", fieldName: "practiceRound", isId: false, isUnique: false, seq })
    };
}

function defineTournamentFactoryInternal<TOptions extends TournamentFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TournamentFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TournamentTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Tournament", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TournamentCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTournamentScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TournamentFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TournamentFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                createdBy: isTournamentcreatedByFactory(defaultData.createdBy) ? {
                    create: await defaultData.createdBy.build()
                } : defaultData.createdBy,
                modifiedBy: isTournamentmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.TournamentCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TournamentCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Tournament) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TournamentCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().tournament.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TournamentCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TournamentCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Tournament" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TournamentTraitKeys<TOptions>, ...names: readonly TournamentTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Tournament} model.
 *
 * @param options
 * @returns factory {@link TournamentFactoryInterface}
 */
export function defineTournamentFactory<TOptions extends TournamentFactoryDefineOptions>(options?: TOptions): TournamentFactoryInterface<TOptions> {
    return defineTournamentFactoryInternal(options ?? {});
}
