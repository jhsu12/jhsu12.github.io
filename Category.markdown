---
layout: page
title: Categories
permalink: /categories/
---

<div class="posts-by-tag">
    <ul class="tag-post-list">
        {% assign sorted_categories = site.categories | sort %}
        {% for category in sorted_categories %}
            {% capture tag_name %}{{ category | first }}{% endcapture %}
            <li>
                <h3 class="tag-header" id="{{ tag_name }}">{{ tag_name | capitalize }}</h3>
                {% for post in site.categories[tag_name] %}
                <div class="tag-post-title">
                    <h4>- <a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h4>
                </div>
                {% endfor %}
            </li>
        {% endfor %}
    </ul>
</div>
