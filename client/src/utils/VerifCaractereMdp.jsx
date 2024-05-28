
export default function VerifCaractereMdp (mdp) {

    const verifNombre = /\d/.test(mdp)
    const verifCaractere = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(mdp);

    return mdp.length >= 6 && verifNombre || verifCaractere ? true : false 
    
}