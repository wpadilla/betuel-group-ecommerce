import { IProductParam } from '@shared/entities/ProductEntity';

export function generateProductDescriptionFromParams(params: IProductParam[]): string {
  if (params.length === 0) {
    return '';
  }

  // Agrupar los parámetros relacionados por productId
  const groupedParams: { [productId: string]: IProductParam[] } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const param of params) {
    if (!groupedParams[param.productId]) {
      groupedParams[param.productId] = [];
    }
    groupedParams[param.productId].push(param);
  }

  // Crear descripciones para cada grupo de parámetros
  const descriptions = Object.values(groupedParams).map((paramGroup) => {
    const descriptionParts = paramGroup.map((param) => {
      let partDescription = `${param.type.toUpperCase()}: ${param.type === 'color' ? param.label : param.value} (${param.relatedParams?.length ? param.label : `Cant: ${param.quantity}`})`;
      if (param.relatedParams && param.relatedParams.length > 0) {
        const relatedDescriptions = param.relatedParams.map((relatedParam) => `${relatedParam.label}: ${relatedParam.value} (Cant: ${relatedParam.quantity})`);
        partDescription += ` \n${relatedDescriptions.join(',\n ')}`;
      }
      return partDescription;
    });
    return descriptionParts.join('.\n\n');
  });

  return descriptions.join('\n\n\n');
}
