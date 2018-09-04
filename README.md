# Dynamic Sizing Font in the Component Library

## What is this?
To comply with accessibility guidelines, we've introduced a new method of using fonts in the Guidebook app and component library.  In addition to dynamic font sizing, we're using this to further decouple theme implementation details from our views to increase testability.

## How to Use
* Instead of using our typical `theme.base_large_font`, you'll use the new API which would be something like: `GBKUIFont(type: .normalBook, style: .title2)`.  Each style corresponds with a default font size, then it will scale in the way that Apple deems appropriate for that style for the user's settings.  Refer to the migration table below for the direct mapping of existing fonts.  Refer to the best practises further below for how best to implement these changes.


## Migration Table

| Theme color | New strategy |
| ----------- | ------------ |
| `theme.base_large_font` | `GBKUIFont(type: .normalBook, style: .title2)` |
| `theme.base_medium_font` | `GBKUIFont(type: normalBook., style: .body)` |
| `theme.base_small_font` | `GBKUIFont(type: .normalBook, style: .callout)` |
| `theme.base_tiny_font` | `GBKUIFont(type: .normalBook, style: .footnote)` |
| `theme.base_large_bold_font` | `GBKUIFont(type: .normalMedium, style: .title2)` |
| `theme.base_xlarge_bold_font` | `GBKUIFont(type: .normalBlack, style: .title1)` |
| `theme.base_large_black_font` | `GBKUIFont(type: .normalBlack, style: .title)` |
| `theme.base_medium_bold_font` | `GBKUIFont(type: .normalMedium, style: .body)` |
| `theme.base_small_bold_font` | `GBKUIFont(type: .normalMedium, style: .callout)` |
| `theme.base_tiny_bold_font` | `GBKUIFont(type: .normalMedium, style: .footnote)` |
| `theme.base_header_font` | `GBKUIFont(type: .uppercaseMedium, style: .caption1)` |
| `theme.base_header_small_font` | `GBKUIFont(type: .uppercaseMedium, style: .caption2)` |
| `theme.base_header_medium_font` | `GBKUIFont(type: .uppercaseMedium, style: .callout)` |
| `theme.day_label_font` | `We can delete this one` |
| `theme.navbar_text_font` | `GBKUIFont(type: .normalBook, style: .title3)` |
| `theme.navbar_text_bold_font` | `GBKUIFont(type: .normalMedium, style: .title3)` |
| `theme.month_label_font` | `GBKUIFont(type: .uppercaseMedium, style: .footnote)` |
| `theme.pill_text_font` | `GBKUIFont(type: .uppercaseMedium, style: .caption1)` |
| `theme.poi_detail_alert_font` | `GBKUIFont(type: .uppercaseBook, style: .footnote)` |
| `theme.schedule_row_start_time_label_font` | `GBKUIFont(type: .normalMedium, style: .footnote)` |
| `theme.schedule_row_end_time_label_font` | `GBKUIFont(type: .normalBook, style: .footnote)` |
| `theme.notification_alert_tip_box_font` | `GBKUIFont(type: .normalMedium, style: .title3)` |

## Best Practises For New Views
* You should define a protocol+class (in swift) that will map the generic font call with a specific name.  For example `scheduleStartTimeFont` which will just return `GBKUIFont(type: .heavyMedium, style: .footnote)`.  This will make our code more testable and readable.  
* Map any other theme values to view specific properties in the above protocol/theme.  For example, you might have something like this:

```swift
protocol ScheduleViewThemeable {
  var titleFont: UIFont { get }
  var subtitleFont: UIFont { get }
  var titleColor: UIColor { get }
  var subtitleColor: UIColor { get }

}

class ScheduleViewTheme: ScheduleViewThemeable {
  var titleFont: UIFont {
    return GBKUIFont(type: .heavyMedium, style: .footnote)
  }
}
```

## Best Practises For Migrating Old Views
* Map the existing theme call to the new API using the corresponding strategy.
* If the view you're migrating is used in multiple places, take steps to make it backward compatible if you're only migrating one view.
* Before you begin work, take screenshots of the view in various states.
* After you're done, take screenshots of the view in the same states as above.  Make sure they're exactly the same.
* Then, take a few screenshots with the text set to different sizes in settings, and include those with a pull request.
* If you're doing a GBKUIComponentLibrary view, make a custom theme for that component (`GBKUIBaseComponentTheme`) and move all of the theme code in there.  See `GBKUICardWithPhotoView` and `GBKUIDateRangeCallout` for examples.
* If the view you're doing is not in the component library, do your best to make a custom theme class for the view akin to best new practises section above.  However, with some larger views this is an unreasonable amount of work.  Use your judgement!
