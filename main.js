(function () {
  "use strict";

  var cfg = window.SALES_CONFIG || {};
  var product = cfg.product || {};
  var price = cfg.price || {};
  var checkout = cfg.checkout || {};
  var seller = cfg.seller || {};
  var support = cfg.support || {};
  var legal = cfg.legal || {};
  var templates = Array.isArray(cfg.templates) ? cfg.templates : [];
  var testMode = cfg.testMode !== false;

  var pending = [];

  /* ---------- helpers ---------- */
  function filled(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  // Only http(s) and mailto links are accepted; anything else is treated as missing.
  function safeUrl(value, allowMailto) {
    if (!filled(value)) return null;
    try {
      var url = new URL(value.trim(), window.location.href);
      if (url.protocol === "https:" || url.protocol === "http:") return url.href;
      if (allowMailto && url.protocol === "mailto:") return url.href;
    } catch (e) { /* invalid */ }
    return null;
  }

  function httpsUrl(value) {
    var url = safeUrl(value, false);
    return url && url.indexOf("https://") === 0 ? url : null;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") node.textContent = attrs[key];
        else if (key === "className") node.className = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  function pendingTag(label) {
    return testMode ? el("span", { className: "pending-tag", text: label || "Pending" }) : null;
  }

  function formatPrice() {
    var amount = Number(price.amount);
    if (!isFinite(amount) || amount <= 0 || !filled(price.currency)) return null;
    try {
      var fmt = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      }).format(amount);
      return price.currency === "USD" ? fmt + " USD" : fmt;
    } catch (e) {
      return null;
    }
  }

  /* ---------- checks ---------- */
  var checkoutUrl = httpsUrl(checkout.url);
  var priceText = formatPrice();

  if (!checkoutUrl) pending.push("Checkout link (real https:// link)");
  if (checkout.internationalExperienceVerified !== true) pending.push("International checkout experience verified");
  if (price.confirmed !== true) pending.push("Price confirmation (current proposal: " + (priceText || "not set") + ")");
  if (product.englishMaterialsReady !== true) pending.push("English materials reviewed and tested with beginners (templates, guide, prompts, checklist)");
  if (!filled(seller.publicName)) pending.push("Public seller or brand name");
  if (!filled(support.channel)) pending.push("Support channel");
  if (!filled(support.responseTime)) pending.push("Support response time");
  if (!filled(cfg.delivery)) pending.push("How buyers receive the files");
  if (!filled(cfg.guarantee)) pending.push("Confirmed guarantee terms");

  var missingDemos = templates.filter(function (t) { return !safeUrl(t.demoUrl); }).length;
  var missingPreviews = templates.filter(function (t) { return !filled(t.previewImage) || !filled(t.previewAlt); }).length;
  if (missingDemos) pending.push("Public demo links (" + missingDemos + " of " + templates.length + " missing)");
  if (missingPreviews) pending.push("Template preview images with alt text (" + missingPreviews + " of " + templates.length + " missing)");
  if (!filled(legal.termsUrl) && !filled(legal.privacyUrl) && !filled(legal.refundUrl)) pending.push("Legal links (terms, privacy, refunds)");
  if (!filled(cfg.siteUrl)) pending.push("Final website address");

  var canBuy = Boolean(checkoutUrl) &&
    checkout.internationalExperienceVerified === true &&
    price.confirmed === true &&
    product.englishMaterialsReady === true;

  /* ---------- product name ---------- */
  if (filled(product.name)) {
    document.querySelectorAll("[data-product-name]").forEach(function (node) {
      node.textContent = product.name;
    });
  }

  /* ---------- canonical ---------- */
  var siteUrl = httpsUrl(cfg.siteUrl);
  if (siteUrl) {
    document.head.appendChild(el("link", { rel: "canonical", href: siteUrl }));
  }

  /* ---------- buy buttons ---------- */
  function buyControl(slot) {
    if (canBuy) {
      var label = slot === "header" ? "Buy now" : "Get the package" + (priceText ? " — " + priceText : "");
      return el("a", { className: "btn", href: checkoutUrl, rel: "noopener", text: label });
    }
    var wrap = el("div");
    wrap.appendChild(el("button", { className: "btn", type: "button", disabled: "", text: "Purchase not available yet" }));
    if (slot !== "header") {
      wrap.appendChild(el("p", { className: "buy-note", text: "Sales haven't opened yet. This button will work once checkout is set up." }));
    }
    return wrap;
  }

  document.querySelectorAll("[data-buy-slot]").forEach(function (slot) {
    var name = slot.getAttribute("data-buy-slot");
    if (name === "header" && !canBuy) { slot.hidden = true; return; }
    slot.hidden = false;
    slot.appendChild(buyControl(name));
  });

  /* ---------- price ---------- */
  var priceValue = document.getElementById("price-value");
  var priceBilling = document.getElementById("price-billing");
  var pricePending = document.getElementById("price-pending");
  if (priceText && (price.confirmed === true || testMode)) {
    priceValue.textContent = priceText;
    priceBilling.textContent = filled(price.billing) ? price.billing : "";
  } else {
    priceValue.textContent = "Price to be announced";
    priceValue.style.fontSize = "1.6rem";
  }
  if (price.confirmed !== true && testMode) pricePending.hidden = false;

  /* ---------- templates ---------- */
  var grid = document.getElementById("template-grid");
  templates.forEach(function (t, i) {
    var demo = safeUrl(t.demoUrl);
    var view = el("div", { className: "browser__view" });

    if (filled(t.previewImage) && filled(t.previewAlt)) {
      view.appendChild(el("img", {
        src: t.previewImage, alt: t.previewAlt, loading: "lazy", decoding: "async", width: "800", height: "600",
      }));
    } else {
      view.appendChild(el("div", { className: "preview-pending", role: "img", "aria-label": "Preview pending for the " + t.title + " template" }, [
        el("strong", { text: "Preview pending" }),
        el("span", { text: "A screenshot of the real English template will appear here." }),
      ]));
    }

    var action;
    if (demo) {
      action = el("a", {
        className: "btn btn--ghost", href: demo, target: "_blank", rel: "noopener",
        text: "Open demo", "aria-label": "Open the " + t.title + " demo (opens in a new tab)",
      });
    } else {
      action = el("button", { className: "btn btn--ghost", type: "button", disabled: "", text: "Demo link coming soon" });
    }

    var card = el("article", { className: "template reveal", "aria-labelledby": "tpl-title-" + i }, [
      el("div", { className: "browser" }, [
        el("div", { className: "browser__bar", "aria-hidden": "true" }, [
          el("i"), el("i"), el("i"),
          el("span", { className: "browser__url", text: t.file || "" }),
        ]),
        view,
      ]),
      el("div", { className: "template__body" }, [
        el("p", { className: "template__num", text: "Template " + String(i + 1).padStart(2, "0") }),
        el("h3", { id: "tpl-title-" + i, text: t.title || "" }),
        el("p", { text: t.purpose || "" }),
        filled(t.sections) ? el("p", { className: "template__sections" }, [
          el("span", { text: "Sections: " }), document.createTextNode(t.sections),
        ]) : null,
        el("div", { className: "template__action" }, [action]),
      ]),
    ]);
    grid.appendChild(card);
  });

  /* ---------- FAQ answers from config ---------- */
  var pendingAnswer = "This hasn't been confirmed yet. The details will be published here before sales open.";

  function fillAnswer(key, nodes) {
    var target = document.querySelector('[data-config-answer="' + key + '"]');
    if (!target) return;
    nodes.forEach(function (n) { if (n) target.appendChild(n); });
  }

  fillAnswer("delivery", filled(cfg.delivery)
    ? [el("p", { text: cfg.delivery })]
    : [pendingTag(), el("p", { text: pendingAnswer })]);

  var supportUrl = safeUrl(support.url, true);
  if (filled(support.channel)) {
    var supportP = el("p");
    supportP.appendChild(document.createTextNode("Support is available through " ));
    if (supportUrl) supportP.appendChild(el("a", { href: supportUrl, text: support.channel }));
    else supportP.appendChild(document.createTextNode(support.channel));
    supportP.appendChild(document.createTextNode(filled(support.responseTime) ? ". Expected response time: " + support.responseTime + "." : "."));
    fillAnswer("support", [
      filled(support.responseTime) ? null : pendingTag("Response time pending"),
      supportP,
      el("p", { text: "Support covers questions about the package. It doesn't include customizing or publishing your website for you." }),
    ]);
  } else {
    fillAnswer("support", [
      pendingTag(),
      el("p", { text: pendingAnswer }),
      el("p", { text: "Customizing or publishing your website for you is not included." }),
    ]);
  }

  fillAnswer("guarantee", filled(cfg.guarantee)
    ? [el("p", { text: cfg.guarantee })]
    : [pendingTag(), el("p", { text: pendingAnswer })]);

  /* ---------- footer ---------- */
  var footerSeller = document.getElementById("footer-seller");
  if (filled(seller.publicName)) {
    footerSeller.textContent = "Sold by " + seller.publicName + ".";
  } else if (testMode) {
    footerSeller.appendChild(pendingTag("Seller name pending"));
  } else {
    footerSeller.remove();
  }

  var footerSupport = document.getElementById("footer-support");
  if (filled(support.channel)) {
    footerSupport.appendChild(document.createTextNode("Support: "));
    if (supportUrl) footerSupport.appendChild(el("a", { href: supportUrl, text: support.channel }));
    else footerSupport.appendChild(document.createTextNode(support.channel));
  } else if (testMode) {
    footerSupport.appendChild(pendingTag("Support channel pending"));
  } else {
    footerSupport.remove();
  }

  var legalLinks = [
    ["Terms of use", legal.termsUrl],
    ["Privacy policy", legal.privacyUrl],
    ["Refund policy", legal.refundUrl],
  ].filter(function (item) { return safeUrl(item[1], false); });
  if (legalLinks.length) {
    var legalList = document.getElementById("footer-legal");
    legalLinks.forEach(function (item) {
      legalList.appendChild(el("li", {}, [el("a", { href: safeUrl(item[1], false), text: item[0] })]));
    });
    document.getElementById("footer-legal-nav").hidden = false;
  }

  /* ---------- test bar ---------- */
  if (testMode) {
    var bar = document.getElementById("test-bar");
    var list = document.getElementById("pending-list");
    pending.forEach(function (item) { list.appendChild(el("li", { text: item })); });
    document.getElementById("pending-count").textContent = String(pending.length);
    if (pending.length === 0) {
      bar.querySelector("details").remove();
      bar.querySelector("p").textContent = "Test version. All settings are filled in. Set testMode to false for the public version.";
    }
    bar.hidden = false;
  }

  /* ---------- discreet reveal animation ----------
   * Fail-safe: content is visible by default. Only elements the observer
   * reports as off-screen get hidden, then fade in when scrolled into view. */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-motion");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var node = entry.target;
        if (entry.isIntersecting) {
          node.classList.remove("pre-reveal");
          observer.unobserve(node);
        } else if (!node.dataset.revealSeen) {
          node.classList.add("pre-reveal");
        }
        node.dataset.revealSeen = "1";
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
    document.querySelectorAll(".reveal").forEach(function (node) { observer.observe(node); });
  }
})();
