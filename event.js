const writeText = str => {
  // @bumble/clipboard

  // Create hidden input with text
  const el = document.createElement('textarea')
  el.value = str
  document.body.append(el)

  // Select the text and copy to clipboard
  el.select()
  const success = document.execCommand('copy')
  el.remove()

  return success
    ? Promise.resolve(str)
    : Promise.reject(new Error('Unable to write to clipboard'))
}

function genericOnClick(info, tab) {
  if(!info.selectionText) return;

  writeText(`[${info.selectionText}](${info.pageUrl})`);
}

var normal = chrome.contextMenus.create({
  "title": "copy link and topic",
  "contexts": ['all'],
  "onclick": genericOnClick
})