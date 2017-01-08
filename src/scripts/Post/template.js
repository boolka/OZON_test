'use strict';

module.exports = function() {
	return `\
<article class=\"post clearfix\" id=\"${this.data.id}\">
	<div class=\"post-meta clearfix\">
		<div class=\"post-meta-logo\">
			<img class=\"post-meta-logo-image\" src=\"${decodeURIComponent(this.data.caption.from.profile_picture)}\" />
		</div>
		<div class=\"post-meta-content\">
			<table class=\"post-meta-content-wrap\"><tbody>
				<tr>
					<td class=\"post-meta-content-wrap-cell\"><span class=\"post-meta-content-username\">${this.data.caption.from.username}</span></td>
				</tr>
				${this.data.location ? `<tr>
					<td class=\"post-meta-content-wrap-cell\"><span class=\"post-meta-content-location\">${this.data.location.name}</span></td>
				</tr>` : ''}
			</tbody></table>
		</div>
		<div class=\"post-meta-time\">${this.timeLeft}</div>
	</div>
	<div class=\"post-facade\">
		<a href=\"${decodeURIComponent(this.data.link)}\">
			<figure>
				<img class=\"post-facade-image\" src=\"${decodeURIComponent(this.data.images.standard_resolution.url)}\" />
			</figure>
		</a>
	</div>
	<div class=\"post-content\">
		<div class=\"post-content-wrap\">
			<section class=\"post-content-likes\">
				<span class=\"post-content-likes-heart\">${this.data.user_has_liked ? '\u2665' : '\u2661'}</span>
				<span class=\"post-content-likes-count\">${this.data.likes.count}</span>
			</section>
			<section class=\"post-content-desc\">${this.data.caption.text}</section>
		</div>
	</div>
</article>\
`;
};
