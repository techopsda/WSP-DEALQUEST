import { ManyToManyFieldPrefix } from './constants';

const getReferenceManyToManyFormField = ({
    resource,
    through,
    reference,
}: Options): string =>
    `${ManyToManyFieldPrefix}${resource}/${through}/${reference}`;

export default getReferenceManyToManyFormField;

interface Options {
    reference: string;
    resource: string;
    through: string;
}
