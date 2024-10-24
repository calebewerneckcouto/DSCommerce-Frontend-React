import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css'
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as productService from '../../../services/product-service';
import * as categoryService from '../../../services/category-service';
import FormTextArea from '../../../components/FormTextArea';
import { CategoryDTO } from '../../../components/models/category';
import FormSelect from '../../../components/FormSelect';
import { selectStyles } from '../../../utils/select';

export default function ProductForm() {
    const navigate = useNavigate();

    const params = useParams();

    const isEditing = params.productId !== 'create';

    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return value.length >= 3 && value.length <= 80;
            },
            message: "Favor informar um nome de 3 a 80 caracteres"
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor informar um valor positivo"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                return /^.{10,}$/.test(value);
            },
            message: "A descrição deve ter pelo menos 10  caracteres"
        },
        categories: {
            value: [],
            id: "categories",
            name: "categories",
            placeholder: "Categorias",
            validation: function (value: CategoryDTO[]) {
                return value.length > 0
            },
            message: "Escolha ao menos uma categoria"

        }
    })


    useEffect(() => {
        categoryService.findAllRequest()
            .then(response => {
                setCategories(response.data);
            })
    }, []);

    useEffect(() => {


        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {

                    setFormData(forms.updateAll(formData, response.data));
                })
        }
    }, [])

    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);

        setFormData(result);

    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }


    function handleSubmit(event: any) {
        event.preventDefault();
        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }
        const requestBody = forms.toValues(formData);

        if (isEditing) {
            requestBody.id = params.productId;
        }

        productService.updateRequest(requestBody)
            .then(() => {
                navigate("/admin/products")
            })
    }


    return (

        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"


                                />
                                <div className='dsc-form-error'>{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.price}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"

                                />
                                <div className='dsc-form-error'>{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control"

                                />
                            </div>

                            <div>
                                <FormSelect
                                    {...formData.categories}
                                    className="dsc-form-control"
                                    styles={selectStyles}
                                    options={categories}
                                    onChange={(obj: any) => {
                                        const newFormData = forms.update(formData, "categories", obj);
                                        setFormData(newFormData);
                                    }}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    getOptionLabel={(obj: any) => obj.name}
                                    getOptionValue={(obj: any) => String(obj.id)}
                                />
                                <div className='dsc-form-error'>{formData.categories.message}</div>
                            </div>

                            <div>
                                <FormTextArea
                                    {...formData.description}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                    className="dsc-form-control dsc-textarea"


                                />
                                <div className='dsc-form-error'>{formData.description.message}</div>
                            </div>


                        </div>

                        <div className="dsc-product-form-buttons">
                            <Link to="/admin/products">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>

                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
