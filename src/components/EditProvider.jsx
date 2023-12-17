import React, { useState, useMemo, useContext, createContext } from 'react'
import {
    COffcanvas,
    COffcanvasHeader,
    COffcanvasTitle,
    CCloseButton,
    COffcanvasBody,
    CDropdownMenu,
    CDropdownItemPlain,
    CFormCheck,
    CFormInput,
    CDropdownToggle,
    CDropdown,
} from '@coreui/react'
const EditContext = createContext()
const useEditValue = (editImage, onEdit) =>
    useMemo(
        () => ({
            editImage,
            onEdit,
        }),
        [editImage, onEdit]
    )
const useOptions = () => {
    return useMemo(
        () => [
            {
                value: 0,
                text: 'Δεξίωση',
                selected: true,
                disabled: true,
            },
            {
                value: 1,
                text: 'Μυστήριο',
                selected: true,
                disabled: true,
            },
            {
                value: 2,
                text: 'Νύφη',
                selected: true,
                disabled: true,
            },
            {
                value: 3,
                text: 'Γαμπρός',
                selected: true,
                disabled: true,
            },
        ],
        []
    )
}
const EditProvider = ({ children }) => {
    const [editImage, setEditImage] = React.useState(null)

    const onEdit = (image) => {
        setEditImage(image)
    }
    const value = useEditValue(editImage, onEdit)
    const options = useOptions()
    return (
        <EditContext.Provider value={value}>
            {children}
            <COffcanvas
                placement="start"
                visible={!(editImage == null)}
                onHide={() => setEditImage(null)}
            >
                <COffcanvasHeader>
                    <COffcanvasTitle>
                        {(editImage || {}).filename || 'Image'}
                    </COffcanvasTitle>
                    <CCloseButton
                        className="text-reset"
                        onClick={() => setEditImage(null)}
                    />
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CDropdown autoClose={false}>
                        <CDropdownToggle custom component={"div"}>
                            <CFormInput
                                type="text"
                                id="floatingInput"
                                floatingClassName="mb-3"
                                floatingLabel="Tags"
                                placeholder="tags"
                            />
                        </CDropdownToggle>
                        <CDropdownMenu>
                            {options.map((option) => (
                                <CDropdownItemPlain key={option.value}>
                                    <CFormCheck
                                        id={option.value}
                                        label={option.text}
                                    />
                                </CDropdownItemPlain>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>
                </COffcanvasBody>
            </COffcanvas>
        </EditContext.Provider>
    )
}

export const useEdit = () => {
    return useContext(EditContext)
}
export default EditProvider
