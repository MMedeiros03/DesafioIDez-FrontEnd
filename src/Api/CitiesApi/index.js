import api from "../index";

export const GetCitiesByStateAsync = (params) => {
  return api.get(`/ConsultaMunicipios/consulta?pagina=${params.page}&tamanhoPagina=${params.sizePage}&estado=${params.state}`);
}
