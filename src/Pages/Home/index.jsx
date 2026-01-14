import { Button, Col, Form, Input, notification, Select, Table } from "antd";
import { GetCitiesByStateAsync } from "../../Api/CitiesApi";
import { useEffect, useState } from "react";
import { BRAZIL_STATES } from "../../Utils/constantsStates";

const HomePage = () => {

    const states = BRAZIL_STATES;
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const openNotificationError = (err) => {
        api.error({
            title: 'Ops. Houve um problema!',
            description: err?.mensagem ?? "Houve um erro inesperado ao tentar realizar a pesquisa de municipios.",
        });
    };

    const searchByState = () => {
        setLoading(true)

        var dataForm = form.getFieldsValue();

        const data = {
            page: pagination.current,
            sizePage: pagination.pageSize,
            state: dataForm.state,
            city: dataForm.city,
            ibge_code: dataForm.ibge_code
        };

        GetCitiesByStateAsync(data)
            .then((response) => {
                setPagination({
                    current : response.data.pagina,
                    pageSize : response.data.tamanhoPagina,
                    total : response.data.totalItens,
                });

                setCities(response.data.itens);
            })
            .catch((error) => {
                openNotificationError(error.response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleTableChange = (pag) => {
        setPagination({
            ...pagination,
            current: pag.current,
            pageSize: pag.pageSize,
        });
    };

    useEffect(() => {
        var dataForm = form.getFieldsValue();
        if(dataForm.state) searchByState();
    }, [pagination.current, pagination.pageSize]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "IBGE_Code",
            dataIndex: "ibgE_Code",
            key: "ibgE_Code",
        },
    ]

    return (
        <>
            {contextHolder}
            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 30, minHeight: '100dvh', height: '100dvh', }}>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 80 }}>

                    <Col style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 30, fontWeight: `bold` }} >Olá! Seja bem-vindo(a)!</span>
                        <span>Consulte todas as cidades dos estados do Brasil de forma rápida e prática.</span>
                    </Col>
                    
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={searchByState}
                    >
                        <Col >
                            <Form.Item 
                                label="Estado" 
                                name="state" 
                                rules={[{ required: true, message: "É obrigatório selecionar um estado" }]}
                            >
                                <Select>
                                    {states.map((state) => (
                                        <Select.Option key={state.value} value={state.value}>
                                            {state.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Município " name="city">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Codigo IBGE" name="ibge_code">
                                <Input type="number" />
                            </Form.Item>

                            <Button htmlType="submit" color="default" variant="outlined" > Pesquisar  </Button>
                        </Col>
                    </Form>

                    <Col >  
                        <Table 
                            loading={loading}
                            scroll={{ x: true, y: 500  }}
                            columns={columns}
                            rowKey="id"
                            pagination={pagination}
                            onChange={handleTableChange}
                            dataSource={cities}
                        />
                    </Col>
                </Col>
            </Col>
        </>
    )
}

export default HomePage;