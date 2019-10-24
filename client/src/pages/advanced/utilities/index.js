import React from 'react'

class AdvancedUtilities extends React.Component {
  render() {
    return (
      <div>
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Utilities</span>
            <a
              href="https://getbootstrap.com/docs/4.3/utilities/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-light"
            >
              Official Documentation
              <i className="fe fe-corner-right-up" />
            </a>
          </h5>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="alert alert-light" role="alert">
              <p className="mb-2">
                <strong>Hey!</strong> This is only a part of all Bootstrap Utilites. Follow next
                links to get information about all of them:
              </p>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/borders/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Borders
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/clearfix/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Clearfix
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/close-icon/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Close icon
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/colors/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Colors
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/display/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Display
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/embed/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Embed
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/flex/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Flex
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/float/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Float
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/image-replacement/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Image Replacement
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/overflow/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Overflow
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/position/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Position
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/screen-readers/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Screen readers
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/shadows/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Shadows
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/sizing/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Sizing
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/spacing/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Spacing
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/stretched-link/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Stretched link
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/text/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Text
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/vertical-align/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Vertical align
              </a>
              <a
                href="https://getbootstrap.com/docs/4.3/utilities/visibility/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                Visibility
              </a>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-6">
                <div className="margin-bottom-0">
                  <h4 className="mb-4">
                    <strong>Color Utilities</strong>
                  </h4>
                  <br />
                  <div className="mb-5">
                    <table className="table table-hover">
                      <colgroup>
                        <col className="col-xs-4" />
                        <col className="col-xs-8" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="text-nowrap">Class</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-default</code>
                          </td>
                          <td>
                            <span className="text-default">Set Default color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-primary</code>
                          </td>
                          <td>
                            <span className="text-primary">Set Primary color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-secondary</code>
                          </td>
                          <td>
                            <span className="text-secondary">Set Secondary color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-success</code>
                          </td>
                          <td>
                            <span className="text-success">Set Success color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-info</code>
                          </td>
                          <td>
                            <span className="text-info">Set Info color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-warning</code>
                          </td>
                          <td>
                            <span className="text-warning">Set Warning color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-danger</code>
                          </td>
                          <td>
                            <span className="text-danger">Set Danger color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-light</code>
                          </td>
                          <td>
                            <span className="text-light">Set Light color to element</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-dark</code>
                          </td>
                          <td>
                            <span className="text-dark">Set Black color to element</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="margin-bottom-0">
                  <h4 className="mb-4">
                    <strong>Display Property</strong>
                  </h4>
                  <br />
                  <div className="mb-5">
                    <table className="table table-hover">
                      <colgroup>
                        <col className="col-xs-4" />
                        <col className="col-xs-8" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="text-nowrap">Class</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-nowrap">
                            <code>.d-inline</code>
                          </td>
                          <td>Forces the element to behave like an inline element</td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.d-inline-block</code>
                          </td>
                          <td>Forces the element to behave like an inline-block element</td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.d-block</code>
                          </td>
                          <td>Forces the element to behave like a block element</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <strong>Underlined Links</strong>
                  </h4>
                  <br />
                  <table className="table table-hover">
                    <colgroup>
                      <col className="col-xs-4" />
                      <col className="col-xs-8" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="text-nowrap">Class</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap">
                          <code>.air__utils__link</code>
                        </td>
                        <td>
                          <a
                            href="javascript: void(0)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="air__utils__link"
                          >
                            Blue Link
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.air__utils__link__underlined</code>
                        </td>
                        <td>
                          <a
                            href="javascript: void(0)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="air__utils__link__underlined"
                          >
                            Underlined Link
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <strong>Font Weight &amp; Style</strong>
                  </h4>
                  <br />
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <colgroup>
                        <col className="col-xs-4" />
                        <col className="col-xs-8" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="text-nowrap">Class</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-nowrap">
                            <code>.font-weight-normal</code>
                          </td>
                          <td className="font-weight-normal">Normal text</td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.font-weight-bold</code>
                          </td>
                          <td className="font-weight-bold">Bold text</td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.font-italic</code>
                          </td>
                          <td className="font-italic">Italic text</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <strong>Text Transformation</strong>
                  </h4>
                  <br />
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <colgroup>
                        <col className="col-xs-4" />
                        <col className="col-xs-8" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="text-nowrap">Class</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-lowercase</code>
                          </td>
                          <td>Transform text to lowercase</td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-uppercase</code>
                          </td>
                          <td>Transform text to uppercase</td>
                        </tr>
                        <tr>
                          <td className="text-nowrap">
                            <code>.text-capitalize</code>
                          </td>
                          <td>Transform text to capitalize</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <div className="p-3">
                    <p className="text-lowercase">Lowercased text</p>
                    <p className="text-uppercase">Uppercased text</p>
                    <p className="text-capitalize">Capitalized text</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <strong>Text Wrapping</strong>
                  </h4>
                  <br />
                  <table className="table table-hover">
                    <colgroup>
                      <col className="col-xs-4" />
                      <col className="col-xs-8" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="text-nowrap">Class</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-truncate</code>
                        </td>
                        <td>Truncating and prevents text from wrapping into multiple lines</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-break</code>
                        </td>
                        <td>Breaks strings if their length exceeds the width of their container</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-nowrap</code>
                        </td>
                        <td>Prevents text from wrapping into multiple lines</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <div className="p-3">
                    <div className="row">
                      <div className="col-md-4">
                        <div
                          className="text-truncate height-100"
                          style={{ border: '1px dashed #e6e8ea' }}
                        >
                          This is text truncate. This is text truncate. This is text truncate. This
                          is text truncate
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="text-break height-100"
                          style={{ border: '1px dashed #e6e8ea' }}
                        >
                          This-is-text-break.This-is-text-break.This-is-text-break.This-is-text-break
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="text-nowrap height-100"
                          style={{ border: '1px dashed #e6e8ea', overflow: 'hidden' }}
                        >
                          This is text nowrap. This is text nowrap. This is text nowrap. This is
                          text nowrap
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <strong>Font Size</strong>
                  </h4>
                  <br />
                  <table className="table table-hover">
                    <colgroup>
                      <col className="col-xs-4" />
                      <col className="col-xs-8" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="text-nowrap">Class</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-*</code>
                        </td>
                        <td>
                          Available values: 0, 10, 12, 14, 16, 18, 21, 24, 28, 30, 36, 40, 48, 50,
                          60, 70 , 80
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-0</code>
                        </td>
                        <td>font-size: 0px</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-10</code>
                        </td>
                        <td>font-size: 10px</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-12</code>
                        </td>
                        <td>font-size: 12px</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-14</code>
                        </td>
                        <td>font-size: 14px</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-16</code>
                        </td>
                        <td>font-size: 16px</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-18</code>
                        </td>
                        <td>font-size: 18px</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.font-size-21</code>
                        </td>
                        <td>font-size: 21px</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <strong>Text Alignment</strong>
                  </h4>
                  <br />
                  <table className="table table-hover">
                    <colgroup>
                      <col className="col-xs-4" />
                      <col className="col-xs-8" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="text-nowrap">Class</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-left</code>
                        </td>
                        <td>Left aligned text</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-center</code>
                        </td>
                        <td>Center aligned text</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-right</code>
                        </td>
                        <td>Right aligned text</td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <code>.text-justify</code>
                        </td>
                        <td>Justified text</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <div className="p-3">
                    <p className="text-left">Left aligned text</p>
                    <p className="text-center">Center aligned text</p>
                    <p className="text-right">Right aligned text</p>
                    <p className="text-justify">
                      Justified text: Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy
                      text ever since the 1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdvancedUtilities
