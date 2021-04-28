import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export var state = {
  modale: {
    allowQuitOnClick: false,
    visible: false,
    content: undefined,
    fetchedData: undefined,
  },
}

export var getters = {
  modaleData(state) {
    return state.modale.fetchedData
  },
}

export var mutations = {
  /***** Modale *****/
  defineModalVisibility: (state, visible) => {
    state.modale.visible = visible
    if (!visible) state.modale.content = undefined
  },
  
  definirContenuModale: (state, contenu) => { state.modale.content = contenu },
  definirComportementModale: (state, etat) => { state.modale.content.allowQuitOnClick = etat },
  modaleFetch: (state, contenu) => {
    state.modale.fetchedData = contenu
  }


}

export var actions = {
  modalHide: (context) => {
    let state = context.state
    let waitingContent = undefined
    if (state.modale.content != undefined)
      if (state.modale.content.props != undefined)
        if (state.modale.content.props.params != undefined)
          waitingContent = state.modale.content.props.params.waitingContent
    if (waitingContent != undefined) state.modale.content = waitingContent
    else {
      state.modale.content = undefined
      state.modale.visible = false
    }
  },
  modalShow: (context) => {
    context.state.modale.visible = true
  },
  modalAlert(context, data) {
    /* Options pour data : 
        {
            message: string,
            callBack: optionnel
        }
        data peut aussi être directement un string, auquel cas une modale est affichée avec le message
    */
    var contenuAlert = {
      componentName: 'ModalAlertComponent',
      allowQuitOnClick: data.allowQuitOnClick == true ? true : false,
      props: { params: undefined }
    }

    if (typeof (data) == 'string') data = { message: data }

    // contenuAlert.props = { params: { message: data } }
    contenuAlert.props = {
      params: {
        ...data,
        waitingContent: context.state.modale.content
      }
    }

    /*  Structure de l'objet envoyé, équivalent à <ComposantModaleAlert params = {message: '...', callBack: callBaclFn} />
        contenuAlert: {
            componentName: 'ComposantModaleAlert',
            props: { 
                params: {
                    message: string,
                    callBack: ?
                }
            }
        }
    */


    
       
    context.commit('definirContenuModale', contenuAlert)
    // context.commit('definirComportementModale', allowQuitOnClick)
    context.commit('defineModalVisibility', true)
  },
  modalYesNo(context, data) {
    /* Options pour data : 
       {
           message: string,
           callBackYes: optionnel
           callBackNo: optionnel
           

       }

       data peut aussi être directement un string, auquel cas une modale est affichée avec le message et un bouton OK
   */
    context.commit(
      'definirContenuModale',
      {
        componentName: 'ModalYesNoComponent',
        allowQuitOnClick: data.allowQuitOnClick == true ? true : false,
        props: {
          params: {
            ...data,
            waitingContent: context.state.modale.content
          }
        }
      }
    )
    context.commit('defineModalVisibility', true)
  },
  modalComponent(context, data) {
    context.commit('definirContenuModale', data)
    context.commit('defineModalVisibility', true)
  },
}

// export var store = new Vuex.Store({

export var storeConfig = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
// )