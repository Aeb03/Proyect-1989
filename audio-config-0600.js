(()=>{'use strict';

window.LIGA_AUDIO_CONFIG={
  version:'0.6.0',

  channels:{
    MASTER:1.00,
    MUSIC:0.80,
    SFX_COMBAT:0.92,
    SFX_UI:0.85
  },

  /* Ganancia individual de cada archivo.
     Estos valores se ajustan desde código durante el playtest.
     Los MP3 originales NO se modifican. */
  gains:{
    'core.impacto':1.00,
    'core.curacion':0.90,
    'core.escudo':0.92,
    'core.ruptura_escudo':0.95,
    'core.proyectil':0.90,
    'core.area':0.95,
    'core.aparicion':0.92,
    'core.ko':1.00,

    'arfeli.dagas_danzantes':1.00,
    'arfeli.disparo_arco':1.00,
    'arfeli.golpe_martillo':1.00,

    'coloso.absorcion_rocosa':1.00,
    'coloso.creacion_pilar':1.00,
    'coloso.golpe_sismico':1.00,

    'piplus.ruptura_marca':1.00,
    'piplus.marca':1.00,
    'piplus.impulso':1.00,

    'onod.enredaderas':1.00,
    'onod.germinar':1.00,
    'onod.esporas_toxicas':1.00,

    'korgan.trampa_pinchos':1.00,
    'korgan.trampa_electrica':1.00,
    'korgan.gancho':1.00,

    'houngan.efigie':1.00,
    'houngan.vinculo':1.00,
    'houngan.dolor_reflejado':1.00
  }
};

})();