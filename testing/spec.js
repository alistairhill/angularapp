var expectNames = function(expectedNames, key) {
  element.all(by.repeater(key + ' in tableData').column(key + '.firstName')).then(function(arr) {
    arr.forEach(function(wd, i) {
      expect(wd.getText()).toMatch(expectedNames[i])
    })
  })
}

describe('Search Users', function() {
  it('should have a title', function() {
    browser.get('http://hillalistair.com/projects/ang/index.html#')
    expect(browser.getTitle()).toEqual('Search Users')
  })

  it('should use a equal comparison when comparator is true', function() {
    var queryName = element(by.model('query.firstName')),
    submitButton = element(by.css('.search-form button[type="submit"]'))
    queryName.clear()
    queryName.sendKeys('Alistair')
    submitButton.click()
    expectNames("Alistair", 'user')
  })
})