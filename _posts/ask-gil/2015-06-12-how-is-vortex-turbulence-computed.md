---
title: How is Vortex turbulence computed?
date: 2015-06-12 00:00:00 Z
categories:
- ask-gil
layout: gil-faq
featured-img-url: 
meta: How is Vortex turbulence computed?
excerpt: We derive turbulence directly from our core model, WRF.
author: gil
keywords: vortex, turbulence, WRF, model, mesoscale
---

##   How is Vortex turbulence computed?

We derive turbulence directly from our core model, WRF. This is a mesoscale model, or better a numerical weather prediction model, with multi-scale capabilities allowing (somehow) seemles modeling chain. Strictly, we can say that WRF dynamics solver is a conservative finite differences code that integrates the non-hydrostatic compressible Euler equations. Currently, we are working in LES capabilities within WRF what will result in better characterization of the turbulence. We will let you know about this soon.
