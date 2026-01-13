import api from "../index";

export const GetCitiesByStateAsync = (params) => {

  var path = `/ConsultaMunicipios/consulta?pagina=${params.page}&tamanhoPagina=${params.sizePage}&estado=${params.state}`;

  if(params.city)
    path += `&municipio=${params.city}`

  if(params.ibge_code)
    path += `&codigo_ibge=${params.ibge_code}`

  return api.get(path);
}
