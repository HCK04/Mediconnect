export function AjouterUserAction(User){
    return({
        type: "AJOUTER_USER",
        payload: User
    })

}

export function SupprimerUserAction(id){
    return ({
        type: "SUPPRIMER_USER",
        payload:id
    })
}

export function ModifierUserAction(User){
    return ({
        type:"MODIFIER_USER",
        payload:User
    })
}